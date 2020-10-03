import {Controller, Post, Body, Get, Param, Patch} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    
    constructor(private productsService: ProductsService) {}
   
    @Post()
    addProduct(
        @Body('title') productTitle:string,
        @Body('description') productDesc:string,
        @Body('price') productPrice:number, 
        ): any {
        const generatedId = this.productsService.insertProduct(
            productTitle,
            productDesc,
            productPrice
        );
        return {id : generatedId};
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getSingleProduct(@Param('id') id:string){
        return this.productsService.getSingleProduct(id);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') id:string,
        @Body('title') productTitle:string,
        @Body('description') productDesc:string,
        @Body('price') productPrice:number){
            this.productsService.updateProduct(
                id,
                productTitle,
                productDesc,
                productPrice
            )
            return null;
    }
}