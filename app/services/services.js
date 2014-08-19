/**
 *		Returns on object that determines which footer item is selected and the number of bets in the current slip.
 *
 * @param {type} $location
 * @param {type} $rootScope
 */
app.factory('footerLogic',
		['$location', '$rootScope', 'appCache',
			function($location, $rootScope, appCache) {
				var obj = {};
				obj.determineFooterSelected = function() {
					var selected = false;
					if ($location.path().indexOf('/live') === 0) {
						selected = 'live';
					}
					else if ($location.path().indexOf('/sports') === 0) {
						selected = 'sports';
					}
					else if ($location.path().indexOf('/casino') === 0) {
						selected = 'casino';
					}
					else if ($location.path().indexOf('/slip') === 0) {
						selected = 'slip';
					}
					else if ($location.path() === '/') {
						selected = 'home';
					}
					return selected;
				};

				obj.updateNumber = function() {
					if (appCache.get('myBets')) {
						obj.number = appCache.get('myBets').bets.length;
					}
					else {
						obj.number = 0;
					}
				};

				obj.updateNumber();

				obj.hideOnFocus = function(element) {
					var query = 'input[type=text], input[type=email], input[type=password], textarea, input[type=number]';
					if (element) {
						targets = element.contents().find(query);
					}
					else {
						targets = $(query);
					}
					var footer = $('#footer'),
						center = $('#center');
					targets.bind('focusin', function() {
						footer.hide();
						center.css('margin-bottom', 0);
					});
					targets.bind('focusout', function() {
						footer.show();
						center.css('margin-bottom', '');
					});
				};

				return obj;
			}]
		);

/**
 *		Returns a self instance.
 *
 *	getSports : returns a promise from the apiEntityLogic method getSports.
 *
 * @param {type} $q
 * @param {type} apiEntityLogic
 *
 */
app.factory('sportLogic',
		['$q', 'apiEntityLogic',
			function($q, apiEntityLogic) {
				this.deferred = $q.defer();
				var self = this;
				this.getSports = function() {
					apiEntityLogic.getSports(function(output) {
						self.deferred.resolve(output);
					});
				}
				return this;
			}]
		);

/**
 *		The user logic service returns an object
 *	responsible for the logging details of the user.
 *
 *  init - gets the object in its initial state
 *  clear_session - sets the object's attributes to null values.
 *
 * @param {type} $cookies
 */
app.factory('userLogic',
		['$cookies',
			function($cookies) {
				var obj = {};

				obj.logged = false;
				obj.api = null;
				obj.username = null;
				obj.balance = null;
				obj.currency = null;
				obj.tainToken = null;
				obj.actionAuth = false;
				obj.auth_timestamp = null;

				obj.cookieReady = function(callback, timeout) {
					var cookie = $cookies.TainToken;
					var t = 0;
					timeout = typeof timeout == 'undefined' ? 1000 : timeout
					var interval = setInterval(function() {
						if (cookie != $cookies.TainToken || t >= timeout) {
							clearInterval(interval);
							return callback();
						}
						t += 10;
					}, 10);
				}

				obj.init = function(userLogicApiObj, redirect) {
					obj.logged = true;
					obj.api = userLogicApiObj;
					obj.username = userLogicApiObj.name;
					obj.balance = userLogicApiObj.balance;
					obj.currency = userLogicApiObj.currency;
					obj.tainToken = $cookies.TainToken;
					obj.actionAuth = true;
					obj.auth_timestamp = parseInt(new Date().getTime() / 1000, 10);
				}

				obj.clear_session = function() {
					obj.logged = false;
					obj.api = null;
					obj.username = null;
					obj.balance = null;
					obj.tainToken = null;
					obj.actionAuth = false;
					obj.auth_timestamp = null;
				}

				obj.getCurrencyByCodeCountry = function(code){
					var currency = 'EUR';
                    switch(code){
                        case 'ro':
                            currency = 'RON';
                        break;
                        case 'ru':
                            currency = 'RUB';
                        break;
                        case 'pl':
                            currency = 'PLN';
                        break;
                        case 'hu':
                            currency = 'HUF';
                        break;
                        case 'el':
                            currency = 'EUR';
                        break;
                        case 'en':
                            currency = 'USD';
                        break;
                        case 'cs':
                            currency = 'CZK';
                        break;
                    }

                    return currency;
				}

				return obj;

			}]
		);


/**
 *		Service is responsible for main mainu toggling.
 *
 * @param {type} $location
 *
 */
app.factory('lightboxLogic',
		['$location',
			function($location) {
				var obj = {};
				obj.on = false;

				var Pair = function(on, to_change) {
					this.on = on;
					var self = this;
					this.toggle = function(forced) {
						if (forced === true) {
							self.on = true;
						}
						else if (forced === false) {
							self.on = false;
						}
						else {
							self.on = !self.on;
						}

						if (typeof to_change == 'function') {
							to_change(self.on);
						}
						else if (to_change) {
							to_change = self.on;
						}
						self.r_builder().refresh();
						if (self.on) {
							document.body.style.overflow = 'hidden';
							$('#lightbox').show();
						}
						else {
							document.body.style.overflow = 'auto';
						}
						$('#lightbox').position().left;//force reflow
						if (self.on){
							$('#center').css('overflow', 'hidden');
							$('#center').css('height', $(window).height() - 100);
							$('#center').css('margin-bottom', 0);
						}
						else{
							$('#center').css('overflow', 'auto');
							$('#center').css('height', 'auto');
							$('#center').css('margin-bottom', '');
						}
					};

					/*executat dupa */
					this.construct_final = function() {
						self.r_builder().refresh();
					};
				};

				obj.r_pair = new r.Holder(Pair, false, 'pair', obj);

				obj.link = function(to) {
					$location.path(to);
				};

				obj.refresh = function() {
					obj.on = !!obj.r_pair.find({on: true});
				};

				obj.close = function() {
					obj.r_pair.pass('toggle', [false]);
				};

				obj.modal = {
					lockedscroll: false,
					display: function(message) {
						this.lockScroll(true);
						$('.modal').show();
					},
					hide: function() {
						this.lockScroll(false);
						$('.modal').hide();
					},
					lockScroll: function(block) {
						$(window).scrollTop(0);
						this.lockedscroll = block;
						var self = this;
						$(document).bind("touchmove", function(event) {
							if (self.lockedscroll) {
								event.preventDefault();
							}
						});
						$(document).bind("mousewheel", function(event) {
							if (self.lockedscroll) {
								event.preventDefault();
							}
						});
					}
				};
				return obj;
			}]
		);

/**
 *		Language service returns an object
 *	with attributes corresponding to the selected language,
 *	all languages, cached languages, and a method to change
 *	the selected language.
 *
 * @param {type} config
 */
app.factory('languageLogic',
		['config',
			function(config) {
				var obj = {};
				obj.selLanguage = config.defaultLanguage();
				obj.languages = config.languages;
				obj.cachedLanguages = config.cachedLanguages;
				obj.change = function(language) {
					obj.selLanguage = language;
				}

				return obj;
			}]
		);


/**
 *			The sign up service returns an object
 *	with the form steps, sets start step to 1, and the current step(initialy false).
 *
 *	- add_step : adds a new step to steps array
 *	- reset : resets the attributes of the specified object to their default values
 *	- get_step : returns the step from the steps array
 *	- obj_fields : returns the properties of all steps (every input value in the registration form).
 *
 */
app.factory('signupLogic',
		[
			function() {
				var obj = {};
				obj.steps = [];
				obj.tmp_steps = [];
				obj.start = 1;
				obj.end = 3;
				obj.actual_step = false;

				obj.add_step = function(step, content) {
					obj.steps[step] = content;
					return true;
				};

				obj.add_tmp_step = function(step, content) {
					obj.tmp_steps[step] = content;
					return true;
				};

				obj.reset = function() {
					obj.steps.splice(0, obj.steps.length);
					obj.actual_step = false;
					return true;
				};

				obj.reset_tmp = function() {
					obj.tmp_steps.splice(0, obj.tmp_steps.length);
					return true;
				};

				obj.get_step = function(step) {
					if (obj.steps.hasOwnProperty(step)) {
						return obj.steps[step];
					} else {
						return false;
					}
				};

				obj.get_tmp_step = function(step) {
					if (obj.tmp_steps.hasOwnProperty(step)) {
						return obj.tmp_steps[step];
					} else {
						return false;
					}
				};

				obj.obj_fields = function() {
					var o = {}, i = 0;
					for (; i < obj.steps.length; i++) {
						for (key in obj.steps[i]) {
							if (!o.hasOwnProperty(key)) {
								o[key] = obj.steps[i][key];
							}
						}
					}

					return o;
				};

				return obj;
			}]
		);

/**
 *
 *		AppCache service handles the browser local storage.
 *
 *	- put : assigns a key to an object and adds it in the storage in JSON format.
 *	- get : gets an object from the local storage by key.
 *
 */
app.factory('appCache',
		[
			function() {
				var obj = {};

				obj.put = function(key, obj) {
					if (!window.localStorage.getItem('appCache')) {
						window.localStorage.setItem('appCache', '{}');
					}

					var o = JSON.parse(window.localStorage.getItem('appCache'));
					o[key] = obj;
					window.localStorage.setItem('appCache', JSON.stringify(o));
				};
				obj.get = function(key) {
					/**
					 * check if session storage is enabled :)
					 */
					if (!navigator.cookieEnabled) {
						return false;
					}
					if (window.localStorage.getItem('appCache')) {
						if (JSON.parse(window.localStorage.getItem('appCache')).hasOwnProperty(key)) {
							return JSON.parse(window.localStorage.getItem('appCache'))[key];
						} else {
							return false;
						}
					} else {
						return false;
					}
				};

				obj.remove = function(key) {
					var appCache = JSON.parse(window.localStorage.getItem('appCache'));
					delete appCache[key];
					window.localStorage.setItem('appCache', JSON.stringify(appCache));
				};

				return obj;
			}]
		);


app.factory('inactivityService',
		['$timeout', 'lightboxLogic', '$location', 'apiUserLogic', 'userLogic', 'appCache', function($timeout, lightboxLogic, $location, apiUserLogic, userLogic, appCache) {

				var obj = {};

				obj.timeoutTime = 1000 * 60 * 60; /* 20 minutes to logout */

				obj.timeoutvar = false;

				obj.start = function() {
					this.resetTimeout();
					var self = this;
					$(window).bind('touchstart click', function() {

						setTimeout(function() {
							//reset timer
							self.resetTimeout();
						}, 100);

					});
				};

				obj.timeout = function() {
					var self = this;
					this.timeoutvar = $timeout(function() {
						self.triggerInactive();
					}, this.timeoutTime);
				};

				obj.resetTimeout = function() {

					if (userLogic.logged === false) {
						if(appCache.get('last_activity')){
							appCache.remove('last_activity');
						}
						return;
					}

					//checking the difference...
					var last_activity = appCache.get('last_activity');

					if (!last_activity) {
						var timestamp = new Date();
						appCache.put('last_activity', timestamp.getTime());
						last_activity = appCache.get('last_activity');
					}
//					console.log(this.timeoutTime);
					var difference = new Date().getTime() - last_activity;
//					console.log(difference);
					if ((new Date().getTime() - last_activity) > this.timeoutTime) {

						appCache.remove('last_activity');
						this.triggerInactive();

					} else {
						var timestamp = new Date();
						appCache.put('last_activity', timestamp.getTime());
					}

				};

				obj.triggerInactive = function() {
					lightboxLogic.modal.display('aaa');
					$location.path('/logout');
				};
				return obj;
			}]
		);
