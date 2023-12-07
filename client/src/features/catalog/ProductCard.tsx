import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Product } from "../../App/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    return (
    <Card >
        <CardMedia
            sx={{height: 140}}
            image="http://picsum.photos/200"
            title="contemplate lizard"
            />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
                lizards turn in to godzilla if you level them up in pokemon battels 
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">share</Button>
            <Button size="small">Learn more</Button>
        </CardActions>

    </Card>
    )
}