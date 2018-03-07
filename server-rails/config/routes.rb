Rails.application.routes.draw do
  root to: 'home#index'

  get '/connect/barong', to: redirect('/auth/barong')
  match '/auth/barong/callback', to: 'sessions#create', via: %i[get post]
end
