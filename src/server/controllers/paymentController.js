const stripe = require('stripe')('sk_test_ynmKhu1hfQKXBQEk7qg8daiQ00kJSfJYGX');


module.exports.charge = (req, res) => {

  const amount = req.body.amount;

  stripe.charges.create(
    {
      amount: amount * 100,
      currency: 'usd',
      source: 'tok_mastercard',
      description: 'My First Test Charge (created for API docs)',
    },
    function (err, charge) {
      if (err) res.status(400).send(err);
      else res.status(200).send(charge);
    }
  )

}
