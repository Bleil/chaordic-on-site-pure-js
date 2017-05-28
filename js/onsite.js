var stylesheets = ['assets/css/style.css', 'assets/css/carousel.css'];
var referenceType = 'reference';
var recommendationType = 'recommendation';

var ChaordicOnSite = {};
ChaordicOnSite = (function () {

    'use strict';

    return {
        mainContainer: '',
        carouselContainer: '.onsite-carousel-container',
        carouselContainerClass: 'onsite-carousel-container',

        create: function (destinationContainer) {
            this.mainContainer = destinationContainer;
            this.addStyles();
            this.createWidget();
        },

        addStyles: function () {
            for (var i = 0; i < stylesheets.length; i++) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = stylesheets[i];
                document.head.appendChild(link);
            }
        },

        createWidget: function () {
            var container = document.querySelector(this.mainContainer);
            if (container) {
                var widget = document.createElement('div');
                widget.classList.add('onsite-recommendations');

                var article = document.createElement('article');
                article.appendChild(this.createWidtgetSection(referenceType));
                article.appendChild(this.createWidtgetSection(recommendationType));

                widget.appendChild(article);
                widget.appendChild(document.createElement('footer'));
                container.appendChild(widget);
                this.getData();
            }
        },

        createWidtgetSection: function (type) {
            if (type) {
                var section = document.createElement('section');
                section.classList.add('onsite-' + type);
                var header = document.createElement('header');
                var content = document.createElement('div');
                if (type === referenceType) {
                    header.innerHTML = 'Você visitou:';
                    content.classList.add('onsite-reference-item-container');
                }
                else if (type === recommendationType) {
                    header.innerHTML = 'e talvez se interesse por:';
                    content.classList.add(this.carouselContainerClass);
                }
                section.appendChild(header);
                section.appendChild(content);
                return section;
            }
            return undefined;
        },

        getData: function () {
            var head = document.head;
            var dataScript = document.createElement('script');
            dataScript.src = '//roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
            head.appendChild(dataScript);
        },

        populate: function (data) {
            if (data.reference && data.reference.item) {
                this.createReferenceItem(data.reference.item);
            }
            if (data.recommendation && data.widget && data.widget.size > 0) {
                Carousel.create(this.carouselContainer, data.recommendation, data.widget.size);
            }
        },

        createReferenceItem: function (referenceItem) {
            var container = document.querySelector('.onsite-reference-item-container');
            var item = Carousel.createItem(referenceItem);
            if (item) {
                container.appendChild(item);
            }
        }
    }
}());

function X(response) {
    ChaordicOnSite.populate(response.data);
}

(function () {
    ChaordicOnSite.create('.chaordic-onsite');
}());