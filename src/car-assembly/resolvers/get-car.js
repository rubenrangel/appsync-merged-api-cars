export function request(ctx) {
  const { id } = ctx.args;

  const cars = [
    {
      id: "1",
      make: "Moto",
      model: "Turbo",
      partIds: ["1", "4"],
    },
    {
      id: "2",
      make: "Cruiser",
      model: "Liner",
      partIds: ["1", "2", "3"],
    },
  ];

  return {
    payload: cars.find(car => car.id == id)
  };
}

export function response(ctx) {
  return ctx.result
}
