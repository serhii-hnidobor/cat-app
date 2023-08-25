import { Fetch } from "./fetch";

function authInterceptor () {
  return {
    headerName: 'x-api-key',
    headerValue: 'live_NGxqAlPWWX4dUfYcV7FQDx5XInW4HdVIsYL7zB7VhGnIvgnaT7H18tF7A0KAy7WJ'
  }
}

const fetchInstance = new Fetch('https://api.thecatapi.com/v1', [authInterceptor]);

export default fetchInstance;
