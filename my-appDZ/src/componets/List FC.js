import React from 'react';

function ListFC(props) {

    const { arr, isOrdered } = props;
<<<<<<< HEAD
    const list = arr.map((item, index) => <li className='itemListInputSubmit' key={index}>{item}</li>)

    return (
        <div className='startLeft'>
            <h1 className='startCenter'>{props.title}</h1>
            {list.length > 0 && !isOrdered ? <ol>{list}</ol> :
                list.length > 0 && isOrdered ? <ul>{list}</ul> :
                    <h2 className='startCenter'>No items</h2>}
=======
    const list = arr.map((item, index) => <li key={index}>{item}</li>)

    return (
        <div>
            {list.length > 0 && !isOrdered ? <ol>{list}</ol> :
                list.length > 0 && isOrdered ? <ul>{list}</ul> : <h2>No items</h2>}
>>>>>>> 68ea456e7e7e390c3b0f38b124fcd304f62a1e19
        </div>
    )
}

export default ListFC;