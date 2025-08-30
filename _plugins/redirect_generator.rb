module Jekyll
  class RedirectGenerator < Generator
    safe true
    priority :highest

    def generate(site)
      # Generate redirects for all posts
      site.posts.docs.each do |post|
        create_redirect_for_post(site, post)
      end
    end

    private

    def create_redirect_for_post(site, post)
      # Extract filename and category info
      filename = File.basename(post.path, '.md')
      category = post.data['categories']
      
      # Skip if no category is defined
      return unless category
      
      if category == 'fr'
        # French posts: create redirect from old /YYYY-MM-DD-slug/ to /fr/slug/
        create_old_format_redirect(site, filename, post.url)
      elsif category == 'en'
        # English posts: create redirect from old /en/YYYY-MM-DD-slug/ to /en/slug/
        create_old_en_format_redirect(site, filename, post.url)
      end
    end

    def create_old_format_redirect(site, filename, new_url)
      # Old French format: /2025-01-02-title/ -> /fr/title/
      redirect_content = generate_redirect_html(new_url)
      
      redirect_page = PageWithoutJekyllProcessing.new(site, site.source, filename, redirect_content)
      redirect_page.data['permalink'] = "/#{filename}/"
      redirect_page.data['layout'] = nil
      site.pages << redirect_page
    end

    def create_old_en_format_redirect(site, filename, new_url)
      # Old English format: /en/2025-08-06-title/ -> /en/title/  
      redirect_content = generate_redirect_html(new_url)
      
      redirect_page = PageWithoutJekyllProcessing.new(site, site.source, "en/#{filename}", redirect_content)
      redirect_page.data['permalink'] = "/en/#{filename}/"
      redirect_page.data['layout'] = nil
      site.pages << redirect_page
    end

    def generate_redirect_html(redirect_url)
      <<~HTML
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Redirection...</title>
          <meta http-equiv="refresh" content="0; url=#{redirect_url}">
          <link rel="canonical" href="#{redirect_url}">
          <script>window.location.href = "#{redirect_url}";</script>
        </head>
        <body>
          <p>Cette page a été déplacée. <a href="#{redirect_url}">Cliquez ici si vous n'êtes pas redirigé automatiquement</a>.</p>
        </body>
        </html>
      HTML
    end
  end

  class PageWithoutJekyllProcessing < Page
    def initialize(site, base, dir, content)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.data = {}
      @content = content
    end

    def content
      @content
    end
  end
end