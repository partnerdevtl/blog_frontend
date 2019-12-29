import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { computed } from '@ember/object';

const { JSONAPIAdapter } = DS;

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  headers: computed('session.data.authenticated.access_token', function() {
    let headers = {};
    if (this.session.isAuthenticated) {
      headers['X-User-Token'] = this.session.data.authenticated.token;
      headers['X-User-Email'] = this.session.data.authenticated.email;
    }

    return headers;
  }),
  host: 'http://localhost:3000',
  authorizer: 'authorizer:devise'
});
