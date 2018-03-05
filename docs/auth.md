# Authentication and authorization

Peatio workbench is configured to use OAuth2 as basic mechanism of authentication and authorization.
If you install and configure your infrastructure as it is described in [installation notes of Peatio workbench]() 
we will call this architecture "Peatio classic OAuth". 

## What is OAuth2?

This is a flow when some external systems asks you to grant permission to some resources on third-party system. 

In case of Peatio classic OAuth configuration an external system is Peatio and third-party system is Barong. 
Meaning of OAuth2 flow will be:
* When User opens http://peatio:8000 and clicks "login with Barong", Peatio redirects User to Barong to grant Access token to resources
* User grants an access to profile in a form of JWT. JWT stands for JSON Web Token which is a signed JSON that contains profile information, 
including email and level of KYC process
* Peatio sends JWT to User
* User uses JWT to communicate through Peatio API

## Scoping

There are several scopes that can be introduced into this iter-system communication:

* Scope of access to User profile resource in form of JWT from external system (Peatio) in provider (Barong)
* Scope of User access to Peatio API (or any additional external system) with JWT

No scopes defined by default. That means, that any system may act based on validity of JWT and
information in payload and special fields (like exp).

If you plan to extend your infrastructure and add other systems, you may consider adding scoping.
In this case User experience in form of User story can be:

As a User I'm granting you an access to my profile in form of JWT, that will be valid for Peatio API only.

Even more granular permission grants can be introduced.

### What should be changed?

Scoping is a part of OAuth2 authorization framework. It is already implemented in Barong. To make use of it you need:

* Edit barong/config/initializers/doorkeeper.rb and change default and optional scopes
* Edit Application record in Barong http://barong:8001/oauth/applications and add needed scopes
* Restart Barong

```ruby
  default_scopes  :peatio
  optional_scopes :extra_system
```

At this step the only visible change you will see is the list of default scopes during sign in process.

Note, that if no scopes where defined in OAuth request, Barong will use a default list of scopes. 
And if there are any scopes beyond list of avaliable in Application record, you will get an error.

### JWT enhancements

We refer to [RFC 7519. JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519) in this part.

Nature of JWT is a signed document. In our installation it carries user profile issued and signed by KYC authority. 
If you plan to use different JWT in way "this ID card is valid for..." you need additional information inside JWT.

At this point we need to connect scopes with JWT for Peatio API. OAuth scopes is a good information source to form
reasonable JWT. If you plan to create per system valid JWT aud field would be a good choice. 

 The "aud" (audience) claim identifies the recipients that the JWT is
   intended for.  Each principal intended to process the JWT MUST
   identify itself with a value in the audience claim.  If the principal
   processing the claim does not identify itself with a value in the
   "aud" claim when this claim is present, then the JWT MUST be
   rejected.  In the general case, the "aud" value is an array of case-
   sensitive strings, each containing a StringOrURI value.  In the
   special case when the JWT has one audience, the "aud" value MAY be a
   single case-sensitive string containing a StringOrURI value.  The
   interpretation of audience values is generally application specific.
   Use of this claim is OPTIONAL.

By default Peatio workbench (Peatio and Barong) doesn't use Audience claim at all, but if we define OAuth scopes as 
a list of systems (like in user story of previos chapter) we may put this list to `aud` field. You may consider 
on adding information on external system that requested a JWT and save it to `sub` field.

RFC defines Subject claim as:

 The "sub" (subject) claim identifies the principal that is the
   subject of the JWT.  The claims in a JWT are normally statements
   about the subject.  The subject value MUST either be scoped to be
   locally unique in the context of the issuer or be globally unique.
   The processing of this claim is generally application specific.  The
   "sub" value is a case-sensitive string containing a StringOrURI
   value.  Use of this claim is OPTIONAL.

In this context external system is a subject and a user is an object. As an sub we will use Application uid

Here is the changes for  barong/config/initializers/doorkeeper.rb:

```ruby

Doorkeeper::JWT.configure do
  # Set the payload for the JWT token. This should contain unique information
  # about the account.
  
  token_payload do |opts|
    account = Account.find(opts[:resource_owner_id])
    {
      email: account.email,
      profile: account.as_json(
        only: %i[email role level],
        include: { profile: { only: %i[first_name last_name state] } }
      ),
      exp: 4.hours.from_now.to_i,
      sub: opts[:application][:uid],
      aud: opts[:scopes].all
    }
  end

  # Set the encryption secret. This would be shared with any other applications
  # that should be able to read the payload of the token.
  secret_key Base64.urlsafe_decode64(Rails.application.secrets.jwt_shared_secret_key)

  # Specify encryption type. Supports any algorithim in
  # https://github.com/progrium/ruby-jwt
  encryption_method 'RS256'
end
```

