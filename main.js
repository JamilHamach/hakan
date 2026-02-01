$(document).ready(function() {
    // 1. التمرير السلس للروابط (Smooth Scroll)
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // 2. تغيير لون الهيدر عند التمرير
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('nav').addClass('shadow-md border-b border-slate-200');
        } else {
            $('nav').removeClass('shadow-md border-b border-slate-200');
        }
    });

    // 3. وظيفة ذكية لفحص حالة العيادة (مفتوح/مغلق)
    function checkClinicStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 = الأحد, 1 = الاثنين...
        const hour = now.getHours();
        let isOpen = false;

        // منطق بسيط بناءً على ساعات العمل المزودة
        if (day >= 1 && day <= 5) { // من الاثنين للجمعة
            if (hour >= 8 && hour < 12) isOpen = true;
            if ((day === 1 || day === 2 || day === 4) && (hour >= 14 && hour < 18)) isOpen = true;
            if (day === 5 && hour >= 8 && hour < 15) isOpen = true;
        }

        if (isOpen) {
            $('#status-badge').text('Jetzt Geöffnet').addClass('bg-emerald-500').removeClass('bg-red-500');
        } else {
            $('#status-badge').text('Momentan Geschlossen').addClass('bg-red-500').removeClass('bg-emerald-500');
        }
    }

    checkClinicStatus();
});