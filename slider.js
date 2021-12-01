$(() => {
    let arr = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"]
    let src = 0
    let timer
    let slider = $("#slider")
    slider
        .css({
            position: 'relative',
            width: "80%",
            height: "60vh",
            margin: "10vh auto",
            boxShadow: "0 0 10px #000",
            background: `url('img/${arr[src]}') center/cover`,
            overflow: "hidden"
        })
        .append('<div id="geden"></div>')
        .append('<div id="gelen"></div>')
        .append('<div id="thumb"></div>')
        .append('<div id="line"></div>')
        .append('<div id="show">1 / 9</div>')
        .click(function(e) {
            change( (e.pageX > $(window).width() / 2) ? 1 : -1 )
        })

        let geden = $("#geden")
        let gelen = $("#gelen")
        $("#geden, #gelen").css({
            position: "absolute",
            width: slider.width(),
            height: slider.height(),
            backgroundPosition: "center",
            backgroundSize: "cover"
        })

        let thumb = $('#thumb')
        thumb.css({
            position: 'absolute',
            width: '100%',
            bottom: 0,
            textAlign: 'center',
        })
        arr.forEach( image => thumb.append(`<img src="img/${image}" />`) )
        let thumbImg = $('#thumb > img')
        thumbImg
            .css({
                width: '25px',
                height: '25px',
                border: '2px solid #FFF',
                borderRadius: '50%',
                margin: '7px',
                opacity: .5,
            })
            .first().css({ opacity: 1 })
            .click(function(e) {
                e.stopPropagation()
                src = $(this).index() - 1
                change(1)
            })

        timer = setTimeout(change, 3000)

        let show = $('#show')
        show
            .css({
                position: 'absolute',
                top: '10px',
                right: '10px',
                font: '1.3em Montserrat, sans-serif',
                backgroundColor: 'grey',
                color: '#fff',
                border: '1px solid grey',
                borderRadius: "5px",
                padding: '3px'
            })

        let line = $('#line')
        line
            .css({
                position: 'absolute',
                top: 0,
                left: 0,
                width: 0,
                height: '3px',
                background: '#fff'
            })       

        function change(direction = 1) {
            clearTimeout(timer)
            src += direction
            if (src < 0) src = arr.length -1
            if (src >= arr.length) src = 0
            geden
                .css({
                    left: 0,
                    backgroundImage: slider.css("backgroundImage") 
                })
                .animate({
                    left: -direction * slider.width()
                }, "slow")
            gelen
                .css({
                    left: direction * slider.width(), 
                    backgroundImage: `url('img/${arr[src]}')`
                })
                .animate({
                    left: 0
                }, "slow")
            line
                .stop(true, true)
                .css({ width: 0 })
                .animate({ width: '100%' }, 3000)
            slider.css({ backgroundImage: `url('img/${arr[src]}')` })
            show.text(`${src + 1} / 9`)
            thumbImg.css("opacity", .5)
            thumbImg.eq(src).css("opacity", 1)
            timer = setTimeout(change, 3000)
        }
})