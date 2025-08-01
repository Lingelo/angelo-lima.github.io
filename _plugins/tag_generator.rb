module Jekyll
  class TagPageGenerator < Generator
    safe true

    def generate(site)
      tags = site.posts.docs.flat_map { |post| post.data['tags'] || [] }.uniq

      tags.each do |tag|
        site.pages << TagPage.new(site, site.source, tag)
      end
    end
  end

  class TagPage < Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir = "tag"
      @name = "#{tag.downcase.gsub(/[éèêë]/, 'e').gsub(/[àâä]/, 'a').gsub(/[ùûü]/, 'u').gsub(/[îï]/, 'i').gsub(/[ôö]/, 'o').gsub(/ç/, 'c').gsub(/\s+/, '-').gsub(/[^a-z0-9\-]/, '')}.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag.html')
      
      # Configuration des métadonnées de la page
      tag_descriptions = {
        'IA' => {
          'title' => "Articles sur l'Intelligence Artificielle",
          'subtitle' => 'IA, LLM, machine learning et technologies d\'avenir',
          'description' => 'Découvrez tous les articles sur l\'Intelligence Artificielle : tutoriels LLM, guides pratiques IA, analyses des nouvelles technologies et cas d\'usage concrets.'
        },
        'Développement' => {
          'title' => 'Articles sur le Développement',
          'subtitle' => 'Programmation, outils dev, architecture et bonnes pratiques',
          'description' => 'Tous les articles sur le développement web et logiciel : tutoriels programmation, outils pour développeurs, architecture logicielle et bonnes pratiques.'
        },
        'Web' => {
          'title' => 'Articles sur les Technologies Web',
          'subtitle' => 'Frontend, backend, frameworks et développement web moderne',
          'description' => 'Découvrez les articles sur les technologies web : React, Vue.js, Node.js, CSS, HTML5 et les dernières innovations du développement web.'
        },
        'Tech' => {
          'title' => 'Articles Tech et Innovation',
          'subtitle' => 'Actualités technologiques, innovations et tendances',
          'description' => 'Suivez l\'actualité tech et les innovations : nouvelles technologies, analyses de marché, tendances digitales et révolutions technologiques.'
        },
        'Personnel' => {
          'title' => 'Articles Personnels et Réflexions',
          'subtitle' => 'Expériences, bilans et réflexions sur la tech',
          'description' => 'Réflexions personnelles, retours d\'expérience et bilans sur le développement, la carrière tech et l\'évolution du secteur.'
        },
        'Sécurité' => {
          'title' => 'Articles sur la Cybersécurité',
          'subtitle' => 'Sécurité informatique, protection et bonnes pratiques',
          'description' => 'Articles sur la cybersécurité : protection des données, sécurité des applications, bonnes pratiques et analyses des menaces.'
        }
      }

      config = tag_descriptions[tag] || {
        'title' => "Articles sur #{tag}",
        'subtitle' => "Tous les articles classés dans la catégorie #{tag}",
        'description' => "Découvrez tous les articles sur #{tag} : guides, tutoriels, analyses et retours d'expérience."
      }

      self.data['title'] = config['title']
      self.data['subtitle'] = config['subtitle']
      self.data['description'] = config['description']
      self.data['tag'] = tag
      self.data['posts'] = site.posts.docs.select { |post| (post.data['tags'] || []).include?(tag) }
    end
  end
end