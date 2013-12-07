define(['jquery'], function($) {

    $.fn.tagsinput = function(options) {
        var options = options || {},
            plgn = new Tagsinput(this, options);
        this.data('tagsinput', plgn);
        return plgn;
    };

    /**
     * Tagsinput - object to wrap a group of tag elements.
     *
     */
    var Tagsinput = function(items, options) {
        this.options = $.extend({}, options);
        this.$curPanel = null;
        this.items = items.on('mouseover', $.proxy(this.showPanel, this));

    };

    /**
     * Show tag panel. Initialize if required.
     *
     */
    Tagsinput.prototype.showPanel = function(e) {
        this.$tag = $(e.target);
        e.preventDefault();
        if (this.$curPanel) {
            this.$curPanel.hide();
        }
        var $panel = this.getPanel(this.$tag),
            p = this.$tag.position();
        $panel.css({
            'top': (parseInt(this.$tag.css('line-height')) / 3.5),
            'left': p.left - (($panel.outerWidth() - $panel.width()) / 2)
        });
        $panel.show();
        this.$curPanel = $panel;
    };

    /**
     * Hide tag panel.
     *
     */
    Tagsinput.prototype.hidePanel = function(e) {
        if (e.target != this.$curPanel[0]) return;
        this.$curPanel.hide();
        this.$curPanel = null;
    };

    /**
     * Handle 'click' event to delete tag.
     *
     * Triggers 'delete' event on tag element.
     *
     */
    Tagsinput.prototype.deleteTag = function(e) {
        this.$curPanel.remove();
        $.proxy(this.items.trigger, this.$tag, 'delete')();
        return false;
    };

    /**
     * Create panel for a single tag element.
     *
     */
    Tagsinput.prototype.getPanel = function($tag) {
        var $panel = $tag.data('hover-placeholder'),
            zIndex,
            copy,
            del;
        if (!$panel) {

            // create panel
            $panel = $('<span class="tag-panel">').css({
                'display': 'block'
            }).append(copy = $tag.clone());
            copy.append(del = $('<i class="fa fa-times-circle tag-delete">'));
            $tag.before($panel);
            zIndex = parseInt($panel.css('z-index'));
            this.$tag.css('z-index', zIndex - 1).data('hover-placeholder', $panel);

            // add events
            $panel.on('mouseout', $.proxy(this.hidePanel, this));
            del.on('click', $.proxy(this.deleteTag, this));

            // block 'click' on the panel
            $panel.on('click', function(el) {
                return false;
            });
        }
        return $panel;
    };

});
