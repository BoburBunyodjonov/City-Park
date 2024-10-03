export class Format {
  public money(amount: number = 0, currency: "USD" | "UZS" = "USD") {
    switch (currency) {
      case "USD":
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(amount);
      case "UZS":
        return `${new Intl.NumberFormat("uz-UZ", {
          style: "decimal",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(amount)} so'm`;
    }
  }

  public number(
    number: number = 0,
    precision: number = 0,
    // type: "round" | "ceil" | "floor" = "floor"
  ): string {
    return new Intl.NumberFormat("uz-UZ", {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
      useGrouping: true,
    }).format(number);
  }
}

export const format = new Format();
