module Jekyll
  module TagFilters
    def tag_url(tag)
      normalized = tag.to_s.downcase
        .gsub(/[éèêë]/, 'e')
        .gsub(/[àâä]/, 'a')
        .gsub(/[ùûü]/, 'u')
        .gsub(/[îï]/, 'i')
        .gsub(/[ôö]/, 'o')
        .gsub(/ç/, 'c')
        .gsub(/\s+/, '-')
        .gsub(/[^a-z0-9\-]/, '')
      
      "/tag/#{normalized}.html"
    end
  end
end

Liquid::Template.register_filter(Jekyll::TagFilters)