var arrowLeftClass = 'left';
var arrowRightClass = 'right';

var Carousel = {};
Carousel = (function () {

    'use strict';

    return {
        ITEM_SIZE: 175,

        maxIndex: 0,
        currentIndex: 0,
        scrollerWidth: 0,

        setStartSettings: function (dataSize) {
            this.maxIndex = ((dataSize >= 3) ? (dataSize - 3) : 0);
            this.currentIndex = 0;
            this.scrollerWidth = ((dataSize > 0) ? (this.ITEM_SIZE * dataSize) : 0);
        },

        create: function (destinationContainer, items, dataSize) {
            var container = document.querySelector(destinationContainer);
            if (container && items) {
                this.setStartSettings(dataSize);

                var carouselContainer = document.createElement('div');
                carouselContainer.classList.add('carousel');

                carouselContainer.appendChild(this.createArrow(arrowLeftClass));

                var carouselItems = document.createElement('div');
                carouselItems.classList.add('carousel-items');

                var scroller = document.createElement('div');
                scroller.classList.add('carousel-items-scroller');
                scroller.style.width = (this.scrollerWidth + 'px');

                for (var i = 0; i < items.length; i++) {
                    scroller.appendChild(this.createItem(items[i]));
                }

                carouselItems.appendChild(scroller);
                carouselContainer.appendChild(carouselItems);
                carouselContainer.appendChild(this.createArrow(arrowRightClass));
                container.appendChild(carouselContainer);
            }
        },

        createArrow: function (direction) {
            var arrow = document.createElement('div');
            arrow.classList.add('carousel-nav-arrow');
            arrow.classList.add(direction);

            var button = document.createElement('button');
            button.type = 'button';
            if (direction === arrowLeftClass) {
                button.title = 'Anterior';
                button.onclick = function () {
                    if (Carousel.currentIndex > 0) {
                        Carousel.currentIndex--;
                        Carousel.scroll();
                    }
                }
            }
            else if (direction === arrowRightClass) {
                button.title = 'Próximo';
                button.onclick = function () {
                    if (Carousel.currentIndex < Carousel.maxIndex) {
                        Carousel.currentIndex++;
                        Carousel.scroll();
                    }
                }
            }

            arrow.appendChild(button);
            return arrow;
        },

        scroll: function () {
            var scroller = document.querySelector('.carousel-items-scroller');
            var transform = 'translate3d(' + ((this.ITEM_SIZE * this.currentIndex) * -1) + 'px, 0px, 0px)';
            scroller.style.webkitTransform = transform;
            scroller.style.MozTransform = transform;
            scroller.style.msTransform = transform;
            scroller.style.OTransform = transform;
            scroller.style.transform = transform;
        },

        createItem: function (dataItem) {
            if (dataItem) {
                var item = document.createElement('div');
                item.classList.add('onsite-item');

                var itemFigure = document.createElement('figure');

                var itemFigureImg = document.createElement('img');
                itemFigureImg.src = dataItem.imageName;
                itemFigureImg.alt = dataItem.name;

                itemFigure.appendChild(itemFigureImg);
                item.appendChild(itemFigure);

                var itemName = document.createElement('p');
                itemName.classList.add('onsite-item-name');
                itemName.innerHTML = this.formatItemName(dataItem.name);
                item.appendChild(itemName);

                if (dataItem.oldPrice) {
                    var itemOldPrice = document.createElement('p');
                    itemOldPrice.classList.add('onsite-item-old-price');
                    itemOldPrice.innerHTML = ('De: ' + dataItem.oldPrice);
                    item.appendChild(itemOldPrice);
                }

                var itemPrice = document.createElement('p');
                itemPrice.classList.add('onsite-item-price');
                itemPrice.innerHTML = ('Por: <strong>' + dataItem.price + '</strong>');
                item.appendChild(itemPrice);

                if (dataItem.productInfo && dataItem.productInfo.paymentConditions) {
                    var itemInfo = document.createElement('p');
                    itemInfo.classList.add('onsite-item-payment-condition');
                    itemInfo.innerHTML = dataItem.productInfo.paymentConditions;

                    var itemComplement = document.createElement('p');
                    itemComplement.classList.add('onsite-item-payment-condition-complement');
                    itemComplement.innerHTML = 'sem juros';

                    item.appendChild(itemInfo);
                    item.appendChild(itemComplement);
                }

                var itemLink = document.createElement('a');
                itemLink.classList.add('onsite-item-link');
                itemLink.href = dataItem.detailUrl;
                itemLink.target = '_blank';
                itemLink.title = dataItem.name;
                itemLink.appendChild(item);

                return itemLink;
            }
            return undefined;
        },

        formatItemName: function (name) {
            if (name.length > 75) {
                var substring = name.substring(0, 71);
                return (substring + '...');
            }
            return name;
        }
    }
}());

(function () {
    Carousel.setStartSettings(0);
}());