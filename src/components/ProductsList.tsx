import React, {useMemo, useState} from 'react';
import { v4 as uuid } from 'uuid';
import { ProductsItem } from './ProductsItem.tsx';

export const ProductsList = (props) => {
    const [products, setProducts] = useState([{
        id: uuid(),
        name: '',
        weight: '',
        ccal: '',
        proteins: '',
        lipid: '',
        harbonates: '',
    }]);

    const [showTotal, setShowTotal] = useState(false);

    const [cookedWeight, setCoockedWeight] = useState('');
    
    const [total, setTotal] = useState({
        id: uuid(),
        name: 'Готовое блюдо',
        weight: 0,
        ccal: 0,
        proteins: 0,
        lipid: 0,
        harbonates: 0,
    })

    const addNewProduct = () => {
        setProducts([...products, {
            id: uuid(),
            name: '',
            weight: '',
            ccal: '',
            proteins: '',
            lipid: '',
            harbonates: '',
        }])
    }

    const calculateTotal = () => {
        let weight = 0;
        let ccal = 0;
        let proteins = 0;
        let lipid = 0;
        let harbonates = 0;
        
        products.forEach(product => {
            console.log(product.weight ? parseInt(product.weight) : 0);
            weight += product.weight ? parseInt(product.weight) : 0;
            ccal += product.ccal ? parseInt(product.ccal * product.weight / 100) : 0;
            proteins += product.ccal ? parseInt(product.proteins * product.weight / 100) : 0;
            lipid += product.ccal ? parseInt(product.lipid * product.weight / 100) : 0;
            harbonates += product.ccal ? parseInt(product.harbonates * product.weight / 100) : 0;
        })

        if (cookedWeight) {
            const w = weight / parseInt(cookedWeight);
            weight = parseInt(cookedWeight);
            ccal = parseInt(ccal * w);
            proteins = parseInt(proteins * w);
            lipid = parseInt(lipid * w);
            harbonates = parseInt(harbonates * w)
        }

        if (weight > 0) {
            setTotal({...total, weight, ccal, proteins, lipid, harbonates});
            setShowTotal(true);
        }
    }

    const onCookedChange = e => {
        setCoockedWeight(e.target.value);
    }

    const changeValue = (val) => {
        let arr = products.map(product => {
            if (product.id === val.id) {
                return {...product, [val.name]: val.value};
            } else {
                return product;
            }
        })
        setProducts([...arr]);
    }

    return (
        <div className="products">
            <div className="products-header _grid">
                <div className="products-header__item">Продукт</div>
                <div className="products-header__item">Вес, г</div>
                <div className="products-header__item">Ккал</div>
                <div className="products-header__item">Белки</div>
                <div className="products-header__item">Жиры</div>
                <div className="products-header__item">Углеводы</div>
            </div>
            <div className='products-list'>
                {products.map((product, i) => 
                    <ProductsItem 
                        key={product.id} 
                        product={product} 
                        hasNext={i === products.length - 1}
                        addNew={addNewProduct} 
                        onChange={newVal => changeValue(newVal)}
                    />
                )}
            </div>
            <div className="total">
                <span className='total-label'>Вес готового блюда, г: </span>
                <input id="cooked" className='cooked' type="number" value={cookedWeight} onChange={onCookedChange} />
                <button className='button' onClick={calculateTotal}>Рассчитать</button>
            </div>

            {showTotal ? <ProductsItem product={total} isDisabled /> : ''}
        </div>
    )
}