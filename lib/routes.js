Router.route('/', {
  template: 'main'
});

Router.route('/about', {
  template: 'about',
  name: 'about'
});

Router.configure({
  layoutTemplate: 'nav'
});
