export function request(ctx) {
  const { id } = ctx.args;

  const cars = [
    {
      id: "1",
      make: "Moto",
      model: "Turbo"
    },
    {
      id: "2",
      make: "Cruiser",
      model: "Liner"
    }
  ];

  return {
    payload: cars.find(car => car.id == id)
  };
}

export function response(ctx) {
  return ctx.result
}
