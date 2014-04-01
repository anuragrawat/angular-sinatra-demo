require 'sinatra'
require 'data_mapper'

DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite3://#{Dir.pwd}/development.db")
class Page
  include DataMapper::Resource
  property :id, Serial
  property :keywords, String, :required => true
end

class Query
  include DataMapper::Resource
  property :id, Serial
  property :keywords, String, :required => true
end

DataMapper.finalize
DataMapper.auto_migrate!

get '/' do
  erb :page_index
end


get '/queries' do
  erb :query_index
end
