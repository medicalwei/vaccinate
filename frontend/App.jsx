// @flow
import * as React from 'react';
import Content from './Components/Content';
import Map from './Components/Map';
import VaccineDataGrid from './Components/VaccineDataGrid';
import Spinner from './Components/Spinner';
import G0vbar from './Components/G0vbar';

import type { Locale } from './Types/Locale';
import type { VaccineType } from './Types/VaccineType';

export default function App(): React.Node {
  const [rows, setRows] = React.useState([]);
  const [locale: Locale, setLocale] = React.useState('zh');
  const [vaccineType: VaccineType, setVaccineType] = React.useState('SelfPaid');
  const url = './hospitals';
  fetch(url).then((data) => data.json()).then((res) => setRows(res));
  return (
    <div>
      <G0vbar locale={locale} />
      <div className="container">
        <h1 style={{ textAlign: 'center', marginTop: 30 }}>全民新冠肺炎疫苗資訊 COVID-19 Vaccination Information</h1>
        <div className="row" style={{ marginTop: 50 }}>
          <div className="col">
            <Content setLocale={setLocale} />
          </div>
          <div className="col d-none d-md-block">
            <Map />
          </div>
        </div>
        <h2 style={{ textAlign: 'center' }}>Vaccination Availability</h2>
        <div style={{ textAlign: 'center' }}>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              onClick={() => setVaccineType('SelfPaid')}
              className="btn btn-outline-primary"
            >
              Self-Paid Vaccine
            </button>
            <button
              type="button"
              onClick={() => setVaccineType('GovernmentPaid')}
              className="btn btn-outline-primary"
            >
              Government-Paid Vaccine
            </button>
          </div>
        </div>
        {rows.length === 0 ? <Spinner />
          : (
            <VaccineDataGrid
              vaccineType={vaccineType}
              rows={rows}
              locale={locale}
            />
          )}
        <p><i>Created with love by a member of g0v, Taiwans civic tech community.</i></p>
      </div>
    </div>
  );
}
