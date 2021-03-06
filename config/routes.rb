Rails.application.routes.draw do
  root 'home#index'

  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'
  get 'calendar', to: 'calendar#show', as: 'calendar'
  get 'gallery', to: 'gallery#index', as: 'gallery'
  post 'events', to: 'events#create'

  resources :users
  resources :sessions
  resources :calendar, only: [:show]
  resources :home, only:[:index]
  resources :gallery, only:[:index]
  resources :events, only: [:index, :create, :show]
  resources :places, only: [:index, :create]
  resources :results, only: [:index, :create], :defaults => { :format => 'json' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  end
