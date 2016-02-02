export default function pipe(value, ...transformers) {
  return transformers.reduce((v, t) => t(v), value);
};