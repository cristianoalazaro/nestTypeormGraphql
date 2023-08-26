import { InputType, Field } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, MaxLength } from 'class-validator'

@InputType()
export class CreatePostInput{
    @IsNotEmpty({message: 'This field cannot be null'})
    @MaxLength(100)
    @Field()
    title: string

    @MaxLength(400)
    @Field({nullable: true})
    content?: string

    @IsInt()
    @Field()
    authorId: number
}