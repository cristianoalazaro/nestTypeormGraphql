import { Mutation, Query, Resolver, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';

@Resolver((of) => Post)
export class PostsResolver {
    constructor(private readonly postService: PostsService){}

    @Query((returns) => [Post])
    posts() {
        return this.postService.findAll()
    }

    @Query((returns) => Post)
    postById(@Args('id', { type: () => Int }) id: number) {
        return this.postService.findById(id)
    }

    @ResolveField((returns) => Author)
    author(@Parent() post: Post): Promise<Author> {
        return this.postService.getAuthor(post.authorId)
    }

    @Mutation((returns) => Post)
    createPost(@Args('postInput') postInput: CreatePostInput) {
        return this.postService.createPost(postInput)
    }
}
