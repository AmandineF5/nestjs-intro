import {Injectable, NotFoundException} from '@nestjs/common';
import {Product} from './product.model';

@Injectable()
export class ProductsService {
    productsList: Product[] = [];

    insertProduct(title:string, desc:string, price:number){
        const id = Math.random().toString();
        const newProduct = new Product (
            id,
            title,
            desc,
            price);
        this.productsList.push(newProduct);
        return id;
    }

    getProducts() {
        return [...this.productsList];
    }

    getSingleProduct(productId:string){
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProduct(
        productId:string,
        title:string, 
        desc:string, 
        price:number
    ){
        const [product] = this.findProduct(productId)[0];
        const [index] = this.findProduct(productId)[1];
        const updatedProduct = {...product};
        if(title) {
            updatedProduct.title = title;
        }
        if(desc) {
            updatedProduct.description = desc;
        }
        if(price) {
            updatedProduct.price = price;
        }
        
        this.productsList[index] = updatedProduct;
    }

    private findProduct(id:string){
        const product = this.productsList.find((prod) => prod.id == id);
        if (!product) {
            throw new NotFoundException('Could not find the product');
        }
        return product;
    }
}