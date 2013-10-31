define(['jquery', 'lodash'], function($, _) {

    var E = $.fn.editable = function(options) {
        var options = $.extend({
            replacement: '<span />',
            muted: '<i class="text-muted">Enter value here</i>'
        }, options);
        if (this.constructor == E) {
            this.options = options;
            this.muted = $(this.options.muted).hide();
        } else {
            this.each(_.curry(init)(options));
            return this;
        }
    };

    var init = function(options, i, el) {
        var $this = $(this),
            e = $this.data('editable');
        if (e) {
            return e.refresh();
        }

        e = new E(options);
        e.$el = $(el);

        e.replacement = $(e.options.replacement)
            .on('click', $.proxy(e.activate, e));

        $this.before(e.replacement).hide()
            .on('change blur keyup', $.proxy(e.edit, e));

        $this.data('editable', e);
        e.refresh();
    };

    E.prototype.refresh = function() {
        this.orgValue = this.$el.val();
        if (this.orgValue == '') {
            this.replacement.addClass('text-muted').text('Enter value here');
        } else {
            this.replacement.removeClass('text-muted').text(this.orgValue);
        }
        this.replacement.show();
    };

    E.prototype.activate = function(e) {
        this.$el.show().select();
        $(e.target).hide();
    };

    E.prototype.edit = function(e) {
        switch (true) {
            case e.type == 'blur':
            case e.type == 'keyup' && e.which == $.KeyEvent.DOM_VK_ESCAPE:
                this.restore();
            case e.type == 'keyup' && e.which == $.KeyEvent.DOM_VK_RETURN:
            case e.type == 'change':
                this.deactivate();
        }
    };

    E.prototype.restore = function() {
        this.$el.val(this.orgValue);
    };

    E.prototype.deactivate = function() {
        this.refresh();
        this.$el.hide();
    }

    return $;
});
