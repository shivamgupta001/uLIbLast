/** This is a description of the Checkbox Module. */
var TFRadio = function($fieldset){
		
		var radio = {
			scope : this,
			_init : function(){
				
				this._initialize();
				this._generateTemplate();
				this._cacheDom();
				this._applyProperty();
				this._bindEvents();
				this._attachProperties();
				this._render();

				// retrun el
				return this.$childTemplate[0];	
			},
			_initialize : function(){
				var me = this.scope;

				//  variables
				this.dynamicId = me.id || "tf-radio-"+getRandomInt(1, 10000);
				this.markRequired = me.markRequired || false;
				this.fieldLayout = me.fieldLayout || 'row';
				this.styles = me.styles || '';
				
				// innerHTML configs
				this.fieldLabel = me.fieldLabel || '';
				this.value = me.value || '';
				this.fieldGroup = me.fieldGroup || [];
				this.groupLayout = me.groupLayout || 'column';
				
				//class
				this.labelClass = (me.labelClass ? (me.labelClass.constructor === Array ? me.labelClass : [me.labelClass]) : false);
				this.compClass = (me.compClass ? (me.compClass.constructor === Array ? me.compClass : [me.compClass]) : false);
								
				//  methods
				this.render = me.render || '';
				this.listeners = me.listeners || '';

			},
			_generateTemplate : function(){
				var el = [
					'<div id="'+this.dynamicId+'"', 
						'class="tf-flex '+((this.fieldLayout === 'row')? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+'">',
				        '<div control-type="tf-label" class="'+((this.displayLabel === "none")? 'tf-display--none':'')+'">',
				            '<label>'+(this.fieldLabel ? this.fieldLabel : '')+'</label>',
				            '<span class="tf-required--red '+(this.markRequired ? 'tf-display--none':'')+'">*</span>',
				        '</div>',
				        '<div control-type="tf-radio" class="tf-flex '+((this.groupLayout === 'row') ? 'tf-flex-direction--row ' : 'tf-flex-direction--column ')+'">',
				         	// radio list  
				        '</div>',
				    '</div>'
				].join('\n');

				this.$childTemplate = $(el);
			},
			_cacheDom : function(){

				//cache Dom
				this.outerComp = this.$childTemplate[0];
				this.controlComp = this.$childTemplate.find('div[control-type="tf-radio"]')[0];
				this.labelComp = this.$childTemplate.find('div[control-type="tf-label"]')[0];
			},
			_applyProperty : function(){
				
				//apply styles
				if(this.styles != ''){
					Object.keys(this.styles).forEach(function(style){
						this.outerComp.style[style] = this.styles[style];
					}, this);
				}

				//apply classes
				if(this.compClass) this.outerComp.classList.add.apply(this.outerComp.classList , this.compClass);
				if(this.labelClass) this.labelComp.classList.add.apply(this.labelComp.classList, this.labelClass);

				// add check boxes to template
				this.fieldGroup.forEach(function(val , index){

					var dynamicId = 'radio-'+getRandomInt(1,10000);
					$('<div>').append(
	   					$('<input />', { type: 'radio', id:dynamicId , value: val.value, name : val.name})
	   						.attr((val.attributes ? val.attributes : {})),
	   					$('<label>', { for: dynamicId, text: val.display})
	   				).appendTo(this.controlComp);
				},this);
			},
			_bindEvents : function(){
				var me = this.scope;
				if(this.listeners != ''){
					for(var listener in this.listeners){
						this.controlComp.addEventListener(listener , this.listeners[listener].bind(me));
					}
				}
			},
			_render : function(){
				
				if(this.render != ''){
					this.render();
				}
			},
			_attachProperties : function(){
				var me = this.scope;

				//properties
				me.controlComp = this.controlComp;
				me.outerComp = this.outerComp;
				me.labelComp = this.labelComp;
				
				//methods
				TFCheckboxMethods.call(me);

				me.outerComp.shared = me;
			}

		};
		
				
		function getRandomInt(min, max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random()*(max - min)+min);
		}
		
	return	radio._init();
	
};
