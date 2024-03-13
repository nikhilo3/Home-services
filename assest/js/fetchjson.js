const fetchData = async ()=>{
    let response = await fetch('data.json');
    let data = await response.json();
    return data;
}

export {fetchData}