const PaymentOption = ({ method, setMethod, value, logo, label }) => (
  <div
    onClick={() => setMethod(value)}
    className="flex items-center gap-3 p-2 px-3 border border-black/10 cursor-pointer"
  >
    <p
      className={`min-w-3.5 h-3.5 border border-black/20 rounded-full ${
        method === value ? "bg-green-600" : ""
      }`}
    ></p>
    {logo ? (
      <img className="h-5 mx-4" src={logo} alt={value} />
    ) : (
      <p className="mx-4 text-sm font-medium text-gray-500">{label}</p>
    )}
  </div>
);

export default PaymentOption;