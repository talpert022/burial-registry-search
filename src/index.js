
import React from 'react';
import ReactDOM from 'react-dom';

import {
	ReactiveBase,
	DataSearch,
	DateRange,
	MultiList,
	SelectedFilters,
	DynamicRangeSlider,
	ReactiveList
} from '@appbaseio/reactivesearch';

import {
	ReactiveGoogleMap,
	ReactiveOpenStreetMap
} from '@appbaseio/reactivemaps';

import {
	Row,
	Button,
	Col,
	Card,
	Collapse,
	Descriptions,
	Switch,
	Tree,
	Popover,
	Affix
} from 'antd';
import 'antd/dist/antd.css';
const { Panel } = Collapse;


function getNestedValue(obj, path) {
	const keys = path.split('.');
	const currentObject = obj;
	const nestedValue = keys.reduce((value, key) => {
		if (value) {
		return value[key];
		}
		return '';
	}, currentObject);
	if (typeof nestedValue === 'object') {
		return JSON.stringify(nestedValue);
	}
	return nestedValue;
}

function renderItem(res, triggerClickAnalytics) {
	let { image, url, description, title } = {"description":"death_city","image":"","showRest":true,"title":"surname","url":""};
	// image = getNestedValue(res,image);
	image = "/registry/registry.png";
	title = getNestedValue(res,"surname") + ", " + getNestedValue(res,"forename");
	url = getNestedValue(res,url);
	let death = getNestedValue(res,"death_date");
	let aged = "(aged " + getNestedValue(res,"age") + " years)";
	let death_place = getNestedValue(res,"place_of_death");
	let death_cause = getNestedValue(res,"death_cause");
	let birth_place = getNestedValue(res,"birth_place");
	return (
		<Row onClick={triggerClickAnalytics} type="flex" gutter={16} key={res._id} style={{margin:'20px auto',borderBottom:'1px solid #ededed'}}>
			<Col span={image ? 6 : 0}>
				{image &&  <a href={image} target='registry_image'><img src={image} alt={title} width='200px;'/></a> }
			</Col>
			<Col span={image ? 18 : 24}>
				<Descriptions title={title} column={1} size="small" bordered>
					<Descriptions.Item label="Date of death">{death}</Descriptions.Item>
					<Descriptions.Item label="Place of death">{death_place}</Descriptions.Item>
					<Descriptions.Item label="Cause of death">{death_cause}</Descriptions.Item>
					<Descriptions.Item label="Place of residence">{getNestedValue(res, "late_residence_street")}</Descriptions.Item>
					<Descriptions.Item label="Place of birth">{getNestedValue(res, "birth_place")}</Descriptions.Item>
					<Descriptions.Item label="Age">{getNestedValue(res,"age")}</Descriptions.Item>
					<Descriptions.Item label="Marital status">{getNestedValue(res,"marital_status")}</Descriptions.Item>
					<Descriptions.Item label="Cemetery">Green-Wood Cemetery, Brooklyn, NY, USA</Descriptions.Item>
					<Descriptions.Item label="Date of burial">{getNestedValue(res, "cemetery_date")}</Descriptions.Item>
					<Descriptions.Item label="Grave location">{getNestedValue(res, "grave_location")}</Descriptions.Item>
					<Descriptions.Item label="Grave lot number">{getNestedValue(res, "lot_number")}</Descriptions.Item>
					<Descriptions.Item label="Cemetery IDr">{getNestedValue(res, "id")}</Descriptions.Item>
					<Descriptions.Item label="Undertaker">{getNestedValue(res, "undertaker")}</Descriptions.Item>
				</Descriptions>

				{/*<Collapse ghost={true} defaultActiveKey={[]}>*/}
				{/*	<Panel header="Gravesite info" key="1">*/}
				{/*		<Descriptions column={1} size="small"  bordered>*/}
				{/*			<Descriptions.Item label="Cemetery">Green-Wood Cemetery, Brooklyn, NY, USA</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Date of burial">{getNestedValue(res, "cemetery_date")}</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Grave location">{getNestedValue(res, "grave_location")}</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Grave lot number">{getNestedValue(res, "lot_number")}</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Cemetery IDr">{getNestedValue(res, "id")}</Descriptions.Item>*/}
				{/*			<Descriptions.Item label="Undertaker">{getNestedValue(res, "undertaker")}</Descriptions.Item>*/}
				{/*		</Descriptions>*/}
				{/*	</Panel>*/}
				{/*</Collapse>*/}
			</Col>
			<div style={{padding:'20px'}}>
				{url ? <Button shape="circle" icon="link" style={{ marginRight: '5px' }} onClick={() => window.open(url, '_blank')} />
: null}
			</div>
		</Row>
	);
};

let onPopoverClick = function(item) {
	return <div>{item.place_of_death}</div>;
};

const API_KEY = process.env.REACT_APP_API_KEY;
const App = () => (
	<ReactiveBase
		app="greenwood"
		credentials={API_KEY}
		url="https://scalr.api.appbase.io"
		analytics={true}
		// searchStateHeader
	>
		<Row gutter={16} style={{ padding: 20 }}>
			<Col span={8}>
				<Collapse defaultActiveKey={['1', '2']}>
					<Panel header="Cause of death" key="1">
						<MultiList
						  componentId="death_cause_facet"
						  dataField="death_cause.keyword"
						  size={100}
						  style={{
							marginBottom: 20
						  }}
						  filterLabel="Cause of death"
						 showCheckbox/>
					</Panel>
					<Panel header="Place of death" key="2" forceRender>
						<MultiList
							componentId="place_of_death_country_facet"
							dataField="death_country.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="Country"
							filterLabel="Place of death: country"
							showCheckbox/>
						<MultiList
							componentId="place_of_death_state_facet"
							dataField="death_state.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="State"
							filterLabel="Place of death: state"
							showCheckbox/>
						<MultiList
							componentId="place_of_death_city_facet"
							dataField="death_city.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="City"
							filterLabel="Place of death: city"
							showCheckbox/>
						<MultiList
							componentId="place_of_death_neighborhood_facet"
							dataField="death_neighborhood.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="Neighborhood"
							filterLabel="Place of death: neighborhood"
							showCheckbox/>
						<MultiList
							componentId="place_of_death_hospital_facet"
							dataField="death_hospital.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="Hospital"
							filterLabel="Place of death: hospital"
							showCheckbox/>
						<ReactiveOpenStreetMap
							componentId="place_of_death"
							dataField="death_location"
							title="Place of death"
							size={1000}
							autoCenter
							style={{ height: '300px', width: '100%'}}
							defaultZoom={2}
							showSearchAsMove={false}
							onPopoverClick={onPopoverClick}
							showMarkers={true}
							// center={{ lat: 40.691265, lng: -73.9777743 }}
						/>
						{/*<MultiList*/}
						{/*	componentId="place_of_death_facet"*/}
						{/*	dataField="place_of_death.keyword"*/}
						{/*	showSearch={false}*/}
						{/*	size={100}*/}
						{/*	style={{*/}
						{/*		marginBottom: 20*/}
						{/*	}}*/}
						{/*	title="Place of death"*/}
						{/*	filterLabel="Place of death"*/}
						{/*	showCheckbox/>*/}
						{/*<ReactiveGoogleMap*/}
						{/*	componentId="place_of_death"*/}
						{/*	dataField="death_location"*/}
						{/*	title="Place of death"*/}
						{/*	style={{ height: '300px', width: '100%'}}*/}
						{/*	zoom={25}*/}
						{/*	showSearchAsMove={false}*/}
						{/*	searchAsMove={false}*/}
						{/*/>*/}
					</Panel>
					<Panel header="Place of residence" key="3">
						<MultiList
							componentId="residence_state_facet"
							dataField="late_residence_state.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="State"
							filterLabel="State"
							showCheckbox/>
						<MultiList
						  componentId="residence_city_facet"
						  dataField="late_residence_city.keyword"
						  showSearch={false}
						  size={100}
						  style={{
							marginBottom: 20
						  }}
						  title="City"
						  filterLabel="Residence: city"
						 showCheckbox/>
					</Panel>
					<Panel header="Place of birth" key="4">
						<MultiList
							componentId="place_of_birth_country_facet"
							dataField="birth_country.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="Country"
							filterLabel="Place of birth: country"
							showCheckbox/>
						<MultiList
							componentId="place_of_birth_state_facet"
							dataField="birth_state.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="State"
							filterLabel="Place of birth: state"
							showCheckbox/>
						<MultiList
							componentId="place_of_birth_city_facet"
							dataField="birth_city.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							title="City"
							filterLabel="Place of birth: city"
							showCheckbox/>
					</Panel>
					<Panel header="Marital status" key="5">
						<MultiList
							componentId="marital_status_facet"
							dataField="marital_status.keyword"
							showSearch={false}
							size={100}
							style={{
								marginBottom: 20
							}}
							filterLabel="Marital status"
							showCheckbox/>
					</Panel>
					<Panel header="Date of death" key="6">
						<DynamicRangeSlider
							componentId="death_year_facet"
							dataField="death_year"
							rangeLabels={(min, max) => ({
								start: min,
								end: max,
							})}
							stepValue={1}
							showHistogram={true}
							showFilter={true}
							interval={2}
							react={{
								and: ["CategoryFilter", "SearchFilter"]
							}}
							loader="Loading ..."
							filterLabel="Death year range"
							includeNullValues
						/>
						{/*<DateRange*/}
						{/*	componentId="death_date_facet"*/}
						{/*	title="Range"*/}
						{/*	dataField="death_date"*/}
						{/*	placeholder={{*/}
						{/*		start: 'Start Date',*/}
						{/*		end: 'End Date'*/}
						{/*	}}*/}
						{/*	focused={false}*/}
						{/*	numberOfMonths={1}*/}
						{/*	queryFormat="date"*/}
						{/*	autoFocusEnd={true}*/}
						{/*	showClear={true}*/}
						{/*	showFilter={true}*/}
						{/*	filterLabel="Death Date"*/}
						{/*	URLParams={false}*/}
						{/*	style={{*/}
						{/*		marginBottom: 20*/}
						{/*	}}*/}
						{/*/>*/}
					</Panel>
					<Panel header="Age" key="7">
						<DynamicRangeSlider
							componentId="death_age_facet"
							dataField="age"
							rangeLabels={(min, max) => (
								{
									"start": "0 years",
									"end": "110 years"
								}
							)}
							stepValue={1}
							showHistogram={true}
							showFilter={true}
							interval={2}
							react={{
								and: ["CategoryFilter", "SearchFilter"]
							}}
							loader="Loading ..."
							filterLabel="Age Range"
							includeNullValues
						/>
					</Panel>
				</Collapse>
			</Col>
			<Col span={16}>
				<DataSearch
					autosuggest={true}
					componentId="search"
					componentType="DATASEARCH"
					dataField={[
						'surname',
						'surname.autosuggest',
						'surname.english',
						'surname.search',
						'late_residence_city',
						'late_residence_city.keyword',
						'forename',
						'forename.keyword'
					]}
					debounce={0}
					defaultValue={undefined}
					fieldWeights={[
						1,
						1,
						1,
						1,
						1,
						1,
						1,
						1
					]}
					fuzziness={0}
					highlight={false}
					highlightField={[
						'surname',
						'late_residence_city',
						'forename'
					]}
					placeholder="Search"
					queryFormat="and"
					showFilter={true}
					size={20}
					strictSelection={false}
					style={{
						marginBottom: 20
					}}
				/>

				<SelectedFilters />
				<div id="result">
					<ReactiveList
				  componentId="result"
				  dataField="_score"
				  pagination={true}
				  react={{
				    and: [
				    	'death_cause_facet',
						'residence_city_facet',
						'death_date_facet',
						'death_year_facet',
						'death_age_facet',
						'residence_state_facet',
						'place_of_death_facet',
						'marital_status_facet',
						'place_of_death_country_facet',
						'place_of_death_state_facet',
						'place_of_death_city_facet',
						'place_of_death_neighborhood_facet',
						'place_of_death_hospital_facet',
						'place_of_birth_country_facet',
						'place_of_birth_state_facet',
						'place_of_birth_city_facet',
						'search'
				    ]
				  }}
				  renderItem={renderItem}
				  size={5}
				  style={{
				    marginTop: 20
				  }}
				/>
				</div>
			</Col>
			
		</Row>
	</ReactiveBase>
);

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
