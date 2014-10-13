require 'mail'

Mail.defaults do
  delivery_method :smtp, {
    :address => 'smtp.sendgrid.net',
    :port => '587',
    :domain => 'heroku.com',
    :user_name => ENV['SENDGRID_USERNAME'],
    :password => ENV['SENDGRID_PASSWORD'],
    :authentication => :plain,
    :enable_starttls_auto => true
  }
end

Mail.deliver do
  to 'elo.henrique@gmail.com'
  from 'sender@example.comt'
  subject 'Contato pelo Site CREA Mais Profissional'
  body 'Sending email with Ruby through SendGrid!'
end