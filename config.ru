use Rack::Static,
  :urls => ["/img", "/js", "/css", "/fonts", "/includes"],
  :root => "public"

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

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}

map '/mail' do
  run lambda { |env|
    request = Rack::Request.new(env)
    case request.request_method
    when 'POST'
      begin
        Mail.deliver do
          to 'eleicaocrea2014@gmail.com'
          from "#{request.params['name']}<#{request.params['email']}>"
          subject 'Contato pelo Site CREA Mais Profissional'
          body request.params['message']
        end
      rescue
        [200, {'Content-Type' => 'text/plain'}, ['error']]
      else
        [200, {'Content-Type' => 'text/plain'}, ['success']]
      end
    end
    }
end