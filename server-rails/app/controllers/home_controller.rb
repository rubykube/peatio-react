class HomeController < ApplicationController
  def index
    render file: 'public/react/index.html'
  end
end
