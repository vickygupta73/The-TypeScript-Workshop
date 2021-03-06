export const getTheValue = async (val: number = 0) => {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 100) + val;
      // Arbitrary error condition - if the random number is divisible by 10.
      if (number % 10 === 0) {
        reject('Bad modulus!');
      } else {
        console.log(`The value is ${number}`);
        resolve(number);
      }
    }, 1000);
  });
};

const generateTheNumber = (iterations: number): void => {
  Promise.allSettled(
    // Produces an array of `iterations` length with the pending promises of `getTheValue()`.
    Array(iterations)
      .fill(null)
      .map(() => getTheValue())
  )
    .then((settledResults) => {
      // Map all the results into the failed, succeeded and total values.
      const results = settledResults.reduce(
        (prev, current) => {
          return current.status === 'fulfilled'
            ? {
                ...prev,
                succeeded: prev.succeeded + 1,
                total: prev.total + current.value,
              }
            : { ...prev, failed: prev.failed + 1 };
        },
        {
          failed: 0,
          succeeded: 0,
          total: 0,
        }
      );
      console.log(results);
    })
    .finally(() => console.log('We are done!'));
};

generateTheNumber(10);
