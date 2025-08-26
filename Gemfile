# frozen_string_literal: true

source "https://rubygems.org"

# Jekyll and core dependencies
gem "jekyll", "~> 4.3.4"

# Jekyll plugins
gem "jekyll-paginate", "~> 1.1"
gem "jekyll-sitemap", "~> 1.4"

# Development and build tools
gem "webrick", "~> 1.8"

# Test frameworks
gem "appraisal", "~> 2.5"

# Windows and JRuby compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb gem to v0.6.x on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]