import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  Redirect,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-prodcut.dto';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAll(): any[] {
    return this.productsService.getAll();
  }

  @Get()
  redirect(@Req() req: Request, @Res() res: Response): void {
    res.status(201).end('getAll');
  }

  @Get('yandex')
  @Redirect('https://yandex.ru', 301)
  redirectToYandex() {
    return null;
  }

  @Get(':id')
  @Header('Cache-Control', 'none')
  getOne(@Param('id') id: string): string {
    return this.productsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProduct: CreateProductDto) {
    return this.productsService.create(createProduct);
  }

  @Put(':id')
  update(@Body() updateProduct: UpdateProductDto, @Param('id') id: string) {
    return this.productsService.update({ ...updateProduct, id });
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.productsService.remove(params.id);
  }
}
