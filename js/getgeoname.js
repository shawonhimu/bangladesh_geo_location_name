let divisions = [];
let districts = [];
let upazillas = [];
let unions = [];

// Fetch data for divisions, districts, upazillas, and unions
fetch("json/divisions.json")
	.then((response) => response.json())
	.then((data) => {
		divisions = data;
		populateDivisionDropdown();
	})
	.catch((error) => console.error("Error fetching divisions:", error));

fetch("json/districts.json")
	.then((response) => response.json())
	.then((data) => {
		districts = data;
	})
	.catch((error) => console.error("Error fetching districts:", error));

fetch("json/upazillas.json")
	.then((response) => response.json())
	.then((data) => {
		upazillas = data;
	})
	.catch((error) => console.error("Error fetching upazillas:", error));

fetch("json/unions.json")
	.then((response) => response.json())
	.then((data) => {
		unions = data;
	})
	.catch((error) => console.error("Error fetching unions:", error));

// Populate Division Dropdown
function populateDivisionDropdown() {
	const divisionSelect = document.getElementById("division");
	divisions.forEach((division) => {
		const option = document.createElement("option");
		option.value = division.id;
		option.textContent = division.bn_name + " (" + division.name + ")";
		divisionSelect.appendChild(option);
	});
}

// Load Districts Based on Selected Division
function loadDistricts() {
	const districtSelect = document.getElementById("district");
	const selectedDivisionId = document.getElementById("division").value;

	// Update hidden division fields
	const selectedDivision = divisions.find((division) => division.id === selectedDivisionId);
	if (selectedDivision) {
		document.getElementById("division_name").value = selectedDivision.name;
		document.getElementById("division_bn_name").value = selectedDivision.bn_name;
	} else {
		document.getElementById("division_name").value = "";
		document.getElementById("division_bn_name").value = "";
	}

	// Clear previous district options
	districtSelect.innerHTML = '<option value="">--জেলা নির্বাচন করুন--</option>';
	const filteredDistricts = districts.filter((district) => district.division_id === selectedDivisionId);
	filteredDistricts.forEach((district) => {
		const option = document.createElement("option");
		option.value = district.id;
		option.textContent = district.bn_name + " (" + district.name + ")";
		districtSelect.appendChild(option);
	});

	// Clear subsequent dropdowns and hidden fields
	document.getElementById("upazilla").innerHTML = '<option value="">--উপজেলা নির্বাচন করুন--</option>';
	document.getElementById("union").innerHTML = '<option value="">--ইউনিয়ন নির্বাচন করুন--</option>';
	document.getElementById("district_name").value = "";
	document.getElementById("district_bn_name").value = "";
	document.getElementById("upazilla_name").value = "";
	document.getElementById("upazilla_bn_name").value = "";
	document.getElementById("union_name").value = "";
	document.getElementById("union_bn_name").value = "";
}

// Load Upazillas Based on Selected District
function loadUpazillas() {
	const upazillaSelect = document.getElementById("upazilla");
	const selectedDistrictId = document.getElementById("district").value;

	// Update hidden district fields
	const selectedDistrict = districts.find((district) => district.id === selectedDistrictId);
	if (selectedDistrict) {
		document.getElementById("district_name").value = selectedDistrict.name;
		document.getElementById("district_bn_name").value = selectedDistrict.bn_name;
	}

	// Clear previous upazilla options
	upazillaSelect.innerHTML = '<option value="">--উপজেলা নির্বাচন করুন--</option>';
	const filteredUpazillas = upazillas.filter((upazilla) => upazilla.district_id === selectedDistrictId);
	filteredUpazillas.forEach((upazilla) => {
		const option = document.createElement("option");
		option.value = upazilla.id;
		option.textContent = upazilla.bn_name + " (" + upazilla.name + ")";
		upazillaSelect.appendChild(option);
	});

	// Clear the union dropdown and hidden fields
	document.getElementById("union").innerHTML = '<option value="">--ইউনিয়ন নির্বাচন করুন--</option>';
	document.getElementById("upazilla_name").value = "";
	document.getElementById("upazilla_bn_name").value = "";
	document.getElementById("union_name").value = "";
	document.getElementById("union_bn_name").value = "";
}

// Load Unions Based on Selected Upazilla
function loadUnions() {
	const unionSelect = document.getElementById("union");
	const selectedUpazillaId = document.getElementById("upazilla").value;

	// Update hidden upazilla fields
	const selectedUpazilla = upazillas.find((upazilla) => upazilla.id === selectedUpazillaId);
	if (selectedUpazilla) {
		document.getElementById("upazilla_name").value = selectedUpazilla.name;
		document.getElementById("upazilla_bn_name").value = selectedUpazilla.bn_name;
	}

	// Clear previous union options
	unionSelect.innerHTML = '<option value="">--ইউনিয়ন নির্বাচন করুন--</option>';
	const filteredUnions = unions.filter((union) => union.upazilla_id === selectedUpazillaId);
	filteredUnions.forEach((union) => {
		const option = document.createElement("option");
		option.value = union.id;
		option.textContent = union.bn_name + " (" + union.name + ")";
		unionSelect.appendChild(option);
	});

	// Clear hidden fields for union
	document.getElementById("union_name").value = "";
	document.getElementById("union_bn_name").value = "";
}

// Update hidden union fields based on selected union
function setUnionFields() {
	const selectedUnionId = document.getElementById("union").value;
	const selectedUnion = unions.find((union) => union.id === selectedUnionId);
	if (selectedUnion) {
		document.getElementById("union_name").value = selectedUnion.name;
		document.getElementById("union_bn_name").value = selectedUnion.bn_name;
	} else {
		document.getElementById("union_name").value = "";
		document.getElementById("union_bn_name").value = "";
	}
}
