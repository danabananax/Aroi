import React from 'react';
import {
  Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex,
} from '@chakra-ui/react';
import { ingredientNutrition } from './GetNutritionBtn';
import DisplayNutrition from './DisplayNutrition';

interface Props {
  nutrition: ingredientNutrition
}

export default function NutritionAccordion({ nutrition }: Props) {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="center">
            Nutritional Info
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Flex
            wrap="wrap"
            direction="column"
            alignItems="center"
            py={4}
          >
            <DisplayNutrition nutrition={nutrition} />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
