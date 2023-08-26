import { Injectable } from '@nestjs/common';

import { Post } from './post.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) 
    private postRepository: Repository<Post>,
    private authorService: AuthorsService) {}

    async findAll(): Promise<Post[]> {
        return await this.postRepository.find()
    }

    async findById(id: number): Promise<Post> {
        return await this.postRepository.findOne({
            where: {id}
        })

    }

    createPost(post: CreatePostInput): Promise<Post> {
        const newPost = this.postRepository.create(post)
        return this.postRepository.save(newPost)
    }

    async getAuthor(userId: number): Promise<Author> {
        return this.authorService.findById(userId)
    }
}
