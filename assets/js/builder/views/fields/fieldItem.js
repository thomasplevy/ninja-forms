define( ['builder/views/app/itemControls'], function( itemControlsView ) {
	var view = Marionette.LayoutView.extend({
		tagName: 'div',
		template: '#nf-tmpl-main-content-field',

		regions: {
			itemControls: '.nf-item-controls'
		},

		initialize: function() {
			this.model.on( 'change', this.render, this );
		},

		onBeforeDestroy: function() {
			this.model.off( 'change', this.render );
		},

		onRender: function() {
			this.$el = this.$el.children();
			this.$el.unwrap();
			this.setElement( this.$el );

			this.itemControls.show( new itemControlsView( { model: this.model } ) );
		},

		templateHelpers: function () {
	    	return {
	    		renderClasses: function() {
	    			var classes = 'nf-field-wrap';
	    			if ( this.editActive ) {
	    				classes += ' active';
	    			}
	    			return classes;
	    		},
	    		renderRequired: function() {
	    			if ( 1 == this.required ) {
	    				return '<span class="required">*</span>';
	    			} else {
	    				return '';
	    			}
	    		},
	    		getFieldID: function() {
					if ( jQuery.isNumeric( this.id ) ) {
						return 'field-' + this.id;
					} else {
						return this.id;
					}
				}
			};
		},

		events: {
			'click': 'maybeClickEdit'
		},

		maybeClickEdit: function( e ) {
			if ( jQuery( e.target ).parent().hasClass( 'nf-fields-sortable' ) ) {
				nfRadio.channel( 'fields' ).trigger( 'click:edit', e, this.model );
			}
		}

	});

	return view;
} );