console.warn('haha');

function Person(name){
  this.name = name;
}

Person.prototype.age = 24;

var person  = new Person();

person.age = 20;

console.warn(person.constructor === Person);

console.warn('uuu');
