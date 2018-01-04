require("./sass/style.scss");

require("../node_modules/slick-carousel/slick/slick.scss");

import "gsap";

let $ = require("jquery");

require('slick-carousel');


$(document).ready(function () {

    sample_animation();

    function sample_animation() {

        // split text
        split_text();

        //call loader animation
        loader_animation();


        // create hide loader flags
        let page_loaded = false;
        let loader_animation_play = false;

        //init timeline array
        let time_lines_arr = [];
        let time_lines_arr_full = [];

        //init slider
        let $demo_slider = $('.demo-slider');

        $demo_slider.slick({
            slidesToShow: 1,
            dots: false,
            arrows: false
        });

        // create timelines and push to arrays
        create_timelines();


        //hide loader on load
        $(window).on('load', function () {
            page_loaded = true;
            if (loader_animation_play) hide_loader();
        })


        function create_timelines() {
            $('.slick-slide').each(function () {

                let $this = $(this);

                //create sample selectors
                let title = $this.find('.title span');
                let subtitle = $this.find('.subtitle');

                let tl = new TimelineMax();

                //pause timeline
                tl.pause();

                //timeline animation tweens
                tl.staggerFrom(title, 1, {opacity: 0}, 0.1);
                tl.from(subtitle, 0.9, {y: 20, opacity: 0}, '-=1');

                //push all slides
                time_lines_arr_full.push(tl);

                //push only if not cloned
                if (!($this.hasClass('slick-cloned'))) {
                    time_lines_arr.push(tl);
                }
            })
        }


        function hide_loader() {
            TweenMax.to("#preloader", 1, {x: '100%', onComplete: intro_animation});
        }

        function loader_animation() {
            let tl = new TimelineMax({
                onComplete: function () {

                    loader_animation_play = true;

                    if (page_loaded) hide_loader()
                }
            });

            tl.staggerFrom("#preloader span", 1, {y: 20, opacity: 0}, 0.15);
        }


        function intro_animation() {

            $demo_slider.slick('slickPlay');

            // //play intro slide
            time_lines_arr[0].play();


            $demo_slider.on('afterChange', function (event, slick, currentSlide) {

                //pause all timelines
                time_lines_arr_full.forEach(function (item) {
                    item.pause();
                    item.progress(0);
                })

                //play current timeline
                time_lines_arr[currentSlide].play();

            });
        }

        function split_text() {
            $('.split-text').each(function (index) {
                let characters = $(this).text().split("");
                let $this = $(this);

                $this.empty();
                $.each(characters, function (i, el) {
                    $this.append("<span>" + el + "</span>");
                });

            });
        }
    }

})