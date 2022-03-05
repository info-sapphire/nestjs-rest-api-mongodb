import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-prodcut.dto';

@Injectable()
export class ProductsService {
  private products = [];

  getAll() {
    return this.products;
  }

  getById(id: string) {
    return this.products.find((product) => product.id === id);
  }

  create(productDto: CreateProductDto) {
    const product = {
      ...productDto,
      id: Date.now().toString(),
    };

    this.products.push(product);

    return product;
  }

  update(productDto: UpdateProductDto) {
    const updatedProduct = this.getById(productDto.id);

    if (updatedProduct) {
      this.products = this.products.map((product) => {
        if (product.id === productDto.id) {
          return { ...product, ...productDto };
        }

        return product;
      });
    }
  }

  remove(id: string) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
