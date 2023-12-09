// Basics
let num: number = 12;
let str: string = "str";
let bool: boolean = true;
let val: null | string = null;

const add = (n: number, s: string): void => {
  console.log(n);
  console.log(s);
};

type Func = (n: number, s?: string) => string;

// Arrays
let arr: number[] = [23, 76, 45];
let strArr: string[] = ["str", "str2"];

let arr2: Array<number> = [21];

// This is not an array, it is Tuple. Only available in TypeScript
let tpl: [number, null, string] = [31, null, "str"];

// Objects
// Not recommended for bigger objects
// const obj: {
//   name: string;
//   age: number;
//   gender: string;
// } = {
//   name: "John",
//   age: 19,
//   gender: "Male"
// }

// type User = {
//   name: string;
//   age: number;
//   gender?: string; // Optional
// };

// const user1: User = {
//   name: "John",
//   age: 19,
//   gender: "Male",
// };

// const user2: User = {
//   name: "Lisa",
//   age: 56,
// };

interface Role {
  role?: string;
}

interface EmployeeData extends Role {
  name: string;
  age: number;
  // func: (n: number, m: string) => void;
  func: Func;
}

const employee: EmployeeData = {
  name: "Harry",
  age: 19,
  role: "Software Developer",
  func: (n, s) => {
    if (typeof s === "string") {
      return n + s;
    }
    return n.toString();
  },
};

employee.func(23, "89");

// const funcWithSpread = (...n: number[]): number[] => {
//   return n;
// }

type FuncWithSpread = (...n: number[]) => number[];

const funcWithSpread: FuncWithSpread = (...n) => {
  return n;
};

// function func(n: number): number {
//   return n;
// }

type Func2 = (n: number) => number;

const func3: Func2 = function (n) {
  return n;
};

// const getData = (obj: { name: string; stock: number; price: number }) => {
//   console.log(obj.name);
// }

// interface Product {
//   name: string;
//   stock: number;
//   price: number;
//   imgUrl?: string;
//   readonly _id: string; // To make it read only
// }

// type GetData = (product: Product) => void;

// const getData: GetData = (product) => {
//   console.log(product.name);
// }

// const product1: Product = {
//   name: 'Macbook',
//   stock: 2,
//   price: 149999,
//   _id: "wi4c57yn49trghicwt8749rgvuv57u5u6"
// }

// getData(product1);

// never type ==> If you try to throw Error then it's type is never. But when you return Error then it's type is Error
const errorHandler = (): never => {
  throw new Error();
};

const ReturnError = (): Error => {
  return new Error();
};

type theme = "light" | "dark";

const mode: theme = "dark";

// Classes
class Player {
  // private and protected properties are only available in TypeScript - These are not accessible outside class
  // However child classes can't access private properties but can access protected properties
  // private weight;
  // public height;

  // constructor(height: number, weight: number) {
  //   this.height = height;
  //   this.weight = weight;
  // }

  // Smaller syntax
  public readonly id: string;

  constructor(
    private height: number,
    public weight: number,
    protected power?: number
  ) {
    this.id = String(Math.floor(Math.random() * 10000000000));
  }

  myHeight = () => this.height;
}

const Peter = new Player(100, 70, 89);
console.log(Peter.myHeight());

class SpecialPlayer extends Player {
  special: boolean;

  constructor(
    special: boolean,
    height: number,
    weight: number,
    power?: number
  ) {
    super(height, weight, power);
    this.special = special;
  }

  getMyPower = () => this.power;

  // Getter
  get getMyWeight(): number {
    return this.weight;
  }

  // Setter
  set setMyWeight(val: number) {
    this.weight = val;
  }
}

const GwenStacy = new SpecialPlayer(true, 60, 90, 54);
console.log(GwenStacy.getMyPower());
console.log(GwenStacy.myHeight());
console.log(GwenStacy.id);
console.log(GwenStacy.getMyWeight); // No need to add parenthesis for getter functions
GwenStacy.setMyWeight = 10000; // This is how we use setter functions
console.log(GwenStacy.getMyWeight); // 10000

// Class with user-defined types
interface ProductType {
  name: string;
  price: number;
  stock: number;
  offer?: boolean;
}

interface GiveId {
  getId: () => string;
}

class Product implements ProductType, GiveId {
  private id: string = String(Math.floor(Math.random() * 10000000000));

  constructor(
    public name: string,
    public price: number,
    public stock: number
  ) {}

  getId = () => this.id;
}

const product = new Product("Macbook", 140000, 10);
console.log(product.getId());

// Type Assertion
// const btn = document.getElementById("btn") as HTMLElement;
// const btn = document.getElementById("btn")!;
// const btn = <HTMLElement>document.getElementById("btn");

// const img = document.getElementById("myImg") as HTMLImageElement;

const form = document.getElementById("myForm") as HTMLFormElement;
const input = document.querySelector("#myForm > input") as HTMLInputElement;

form.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  // console.log(value);
  // console.log(typeof value);

  const value = Number(input.value);
  const p = document.createElement("p");

  p.textContent = `The value is ${value + 20}`;
  form.append(p);
};

interface Cred {
  // [key: string]: string;
  name: string;
  email: string;
}

const creds: Cred = {
  name: "Peter",
  email: "peter@gmail.com",
};

let key = "name";
// Both are same
creds[key as keyof Cred];
creds[key as keyof typeof creds];

const getName = (): string => {
  return creds.name;
};

const getEmail = (): string => {
  return creds.email;
};

// const getData = (key: "name" | "email"): string => {
//   return creds[key];
// };

const getData = (key: keyof Cred): string => {
  return creds[key];
};

getData("name");

// Utility Classes ---

// 1. Partial<Type> - copies type of a given type but makes it optional
type Car = {
  model: string;
  mileage: number;
};

const newCar: Partial<Car> = {
  model: "Audi",
};

// 2. Required<Type> - Opposite of Partial
type Car2 = {
  model: string;
  mileage?: number;
};

const newCar2: Required<Car2> = {
  model: "Buggati",
  mileage: 67,
};

// 3. ReadOnly<Type> - Makes it readonly

// 4. Record<Keys, Type>

// type User2 = Record<"name" | "email" | "gender", string>;
interface UserInfo {
  age: number;
}

type UserName = "John" | "Andrew" | "Sam" | "Jack";

const users: Record<UserName, UserInfo> = {
  John: { age: 45 },
  Andrew: { age: 35 },
  Sam: { age: 67 },
  Jack: { age: 34 },
};

// 5. Pick<Type, Keys> - Picks properties from a given type
interface OrderInfo {
  readonly id: number;
  user: string;
  city: string;
  state: string;
  country: string;
  status: string;
}

type ShippingInfo = Pick<OrderInfo, "city" | "state" | "id" | "status">;

// 6. Omit<Type, Keys> - Opposite of Pick
type OmmittedShippingInfo = Omit<ShippingInfo, "state">;

// 7. Exclude<Type, ExcludedUnion> - It removes types from union
// type MyUnion = number | string | boolean;
// type Random = Exclude<MyUnion, boolean>;

// 8. Extract<Type, Union> - It removes types except given one from union
type MyUnion = number | string | boolean;
type Random = Extract<MyUnion, boolean>;

// 9. NonNullable<Type> - Removes null and undefined from union
type MyUnion2 = number | string | boolean | undefined | null;
type Random2 = NonNullable<MyUnion2>;

// 10. Parameters<Type> - Returns array of parameters
const func = (a: number, b: string): void => {
  console.log(a, b);
};

type funcParam = Parameters<typeof func>;

// 11. ConstructorParameters<Type> - Returns array of constructor parameters
class SampleClass {
  constructor(public s: string, public m: string) {}
}

type ConstructorParams = ConstructorParameters<typeof SampleClass>;

// 12. ReturnType<Type> - Returns return type of a function
const func2 = (a: number, b: string): string => {
  return a + b;
};

type FuncReturnType = ReturnType<typeof func2>;

// 13. InstanceType<Type> - Copies type of class's constructor
class SampleClass2 {
  constructor(public s: string, public m: string) {}
}

type ClassType = ConstructorParameters<typeof SampleClass2>;

const user: ClassType = ["d", "ds"];

// Generics
const func4 = <CustomType>(n: CustomType): CustomType => {
  let text: CustomType;
  return n;
};

const ans = func4(3);
const ans2 = func4("3");
const ans3 = func4(undefined);
const ans4 = func4(true);

type Person = {
  name: string;
  age: number;
};

const personFunc = <T>(n: T): T => {
  return n;
};

const person1: Person = {
  name: "Sam Altman",
  age: 54,
};

const res = personFunc(person1);
const res2 = personFunc<Person>(person1);

const funct = <T, U>(n: T, o: U): { n: T; o: U } => {
  return { n, o };
};

const response = funct<number, string>(21, "sec");

type Model = {
  name: string;
  age: number;
};

type ModelInfo = {
  name: string;
  age: number;
  email: string;
};

const funct2 = <T, U extends T>(n: T, o: U): { n: T; o: U } => {
  return { n, o };
};

const model: Model = {
  name: "Name",
  age: 23,
};

const modelInfo: ModelInfo = {
  name: "Name",
  age: 24,
  email: "model@business.com",
};

const data = funct2<Model, ModelInfo>(model, modelInfo);

const models: Model[] = [
  { name: "A", age: 24 },
  { name: "B", age: 75 },
  { name: "C", age: 75 },
  { name: "D", age: 56 },
];

const filterByPeople = <T, U extends keyof T>(
  arr: T[],
  property: U,
  value: T[U]
): T[] => {
  return arr.filter((item) => item[property] === value);
};

const filteredPeopleByName = filterByPeople(models, "name", "B");
const filteredPeopleByAge = filterByPeople(models, "age", 75);

console.log("Filtered by age: ", filteredPeopleByAge);
console.log("Filtered by name: ", filteredPeopleByName);
