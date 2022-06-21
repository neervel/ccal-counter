import React, { useState } from 'react'

export const ProductsItem = ({addNew, product, hasNext, onChange, isDisabled}) => {

    const addNewProduct = () => {
        if (hasNext) {
            addNew()
        }
    }

    const changeValue = (value, name) => {
        onChange({value, name, id: product.id})
    }

    return (
        <div className="product _grid">
            {Object.entries(product).map(([key, value], i) =>
                {return i === 0 ? '' : (
                    <div className="product__field">
                        <input 
                            value={product[key]} 
                            onClick={addNewProduct} 
                            type={i === 1 ? 'text' : 'number'}
                            onChange={(e) => changeValue(e.target.value, key)}
                            disabled={isDisabled} 
                        />
                    </div>
                )}
            )}
        </div>
    )
}
