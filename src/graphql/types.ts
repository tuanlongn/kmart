import { ZodError, ZodFormattedError } from "zod";
import { builder } from "./builder";
import { paginateArgs, paginateQuery } from "./helpers";

export const UserRef = builder.prismaObject("User", {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    email: t.exposeString("email"),
    orders: t.relation("orders"),
  }),
});

export const ProductRef = builder.prismaObject("Product", {
  findUnique: (product) => ({ id: product.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.string({
      nullable: true,
      resolve: (product) => product.description,
    }),
    labelPrice: t.float({
      nullable: true,
      resolve: (product) => product.labelPrice,
    }),
    variants: t.relation("variants"),
  }),
});

export const ProductVariantRef = builder.prismaObject("ProductVariant", {
  findUnique: (variant) => ({ id: variant.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.string({
      nullable: true,
      resolve: (variant) => variant.title,
    }),
    price: t.exposeFloat("price"),
    image: t.relation("image"),
    product: t.relation("product"),
  }),
});

export const ProductImageRef = builder.prismaObject("ProductImage", {
  findUnique: (image) => ({ id: image.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    source: t.exposeString("source"),
    position: t.exposeInt("position"),
  }),
});

export const CategoryRef = builder.prismaObject("Category", {
  findUnique: (category) => ({ id: category.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    description: t.string({
      nullable: true,
      resolve: (category) => category.description,
    }),
    products: t.field({
      args: { ...paginateArgs() },
      select: (args, ctx, nestedSelection) => ({
        categoriesOnProducts: {
          select: {
            product: nestedSelection(true),
          },
          ...paginateQuery(args),
        },
      }),
      type: [ProductRef],
      resolve: (category) => {
        return category.categoriesOnProducts.map((item) => item.product);
      },
    }),
  }),
});

export const CartItemRef = builder.prismaObject("CartItem", {
  findUnique: (item) => ({ id: item.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    quantity: t.exposeInt("quantity"),
    user: t.relation("user"),
    productVariant: t.relation("productVariant"),
  }),
});

export const OrderRef = builder.prismaObject("Order", {
  findUnique: (order) => ({ id: order.id }),
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    items: t.relation("items"),
    status: t.field({
      type: "String",
      resolve: (order) => order.status,
    }),
  }),
});

// Util for flattening zod errors into something easier to represent in your Schema.
function flattenErrors(
  error: ZodFormattedError<unknown>,
  path: string[]
): { path: string[]; message: string }[] {
  // eslint-disable-next-line no-underscore-dangle
  const errors = error._errors.map((message) => ({
    path,
    message,
  }));

  Object.keys(error).forEach((key) => {
    if (key !== "_errors") {
      errors.push(
        ...flattenErrors(
          (error as Record<string, unknown>)[key] as ZodFormattedError<unknown>,
          [...path, key]
        )
      );
    }
  });

  return errors;
}

/**
 * ERROR CUSTOM TYPES
 */

const ErrorInterface = builder.interfaceRef<Error>("Error").implement({
  fields: (t) => ({
    message: t.exposeString("message"),
  }),
});

// A type for the individual validation issues
const ZodFieldError = builder
  .objectRef<{
    message: string;
    path: string[];
  }>("ZodFieldError")
  .implement({
    fields: (t) => ({
      message: t.exposeString("message"),
      path: t.exposeStringList("path"),
    }),
  });

// The actual error type
builder.objectType(ZodError, {
  name: "ArgumentError",
  interfaces: [ErrorInterface],
  fields: (t) => ({
    fieldErrors: t.field({
      type: [ZodFieldError],
      resolve: (err) => flattenErrors(err.format(), []),
    }),
  }),
});

builder.objectType(Error, {
  name: "LogicalError",
  interfaces: [ErrorInterface],
});
