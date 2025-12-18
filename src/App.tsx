import { EstimateFlow } from './features/estimate/components/EstimateFlow';
import { InsurancesType } from './mocks/summary.mock';

interface AppProps {
  storeToken?: string;
  insuranceType?: InsurancesType;
}

function App({ storeToken, insuranceType = InsurancesType.AUTO_INSURANCE }: AppProps) {
  return (
    <div className=" min-h-screen max-w-4xl mx-auto py-6 px-4">
      <EstimateFlow storeToken={storeToken} insuranceType={insuranceType} />
    </div>
  );
}

export default App;
