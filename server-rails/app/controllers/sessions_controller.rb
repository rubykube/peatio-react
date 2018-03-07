class SessionsController < ApplicationController
  def create
    session[:current_user] = auth_hash
    pp auth_hash
    redirect_to '/#/callback?token=' + CGI.escape(auth_hash.dig(:credentials, :token))
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
