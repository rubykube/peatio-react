p Rails.application.secrets.barong_client_id
p Rails.application.secrets.barong_client_secret

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :barong,
           Rails.application.secrets.barong_client_id,
           Rails.application.secrets.barong_client_secret,
           domain: ENV.fetch('BARONG_DOMAIN', 'http://barong:8001')
end
