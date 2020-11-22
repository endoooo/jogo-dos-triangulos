import React, { useState, useRef } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import {
  EquilateralTriangle,
  IsoscelesRightTriangle,
  IsoscelesAcuteTriangle,
  IsoscelesObtuseTriangle,
  ScaleneRightTriangle,
  ScaleneAcuteTriangle,
  ScaleneObtuseTriangle,
} from './Triangle'

const Container = styled.div`
  background: yellow;
`

const SVG = styled.svg`
  display: block;
  width: 100%;
  overflow: visible;
`

function ShapeList() {
  const [triangles, setTriangles] = useState([
    { id: 1, Component: EquilateralTriangle, rotation: 0 },
    { id: 2, Component: IsoscelesRightTriangle, rotation: 0 },
    { id: 3, Component: IsoscelesAcuteTriangle, rotation: 0 },
    { id: 4, Component: IsoscelesObtuseTriangle, rotation: 0 },
    { id: 5, Component: ScaleneRightTriangle, rotation: 0 },
    { id: 6, Component: ScaleneAcuteTriangle, rotation: 0 },
    { id: 7, Component: ScaleneObtuseTriangle, rotation: 0 },
  ])
  const svgRef = useRef(null)

  function rotate() {
    setTriangles(current =>
      current.map((t, i) => {
        if (i !== current.length - 1) return t
        return {
          ...t,
          rotation: (t.rotation += 90),
        }
      })
    )
  }

  function updateTriangles(selectedIndex) {
    setTriangles(current => [
      ...current.slice(0, selectedIndex),
      ...current.slice(selectedIndex + 1),
      current[selectedIndex],
    ])
  }

  return (
    <Container>
      <SVG
        ref={svgRef}
        viewBox="0 0 8 8"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="8" height="8" fill="gray" />
        {triangles.map((t, i) => (
          <t.Component
            key={t.id}
            rotation={t.rotation}
            svgRef={svgRef}
            isActive={i === triangles.length - 1}
            onActivate={() => updateTriangles(i)}
          />
        ))}
      </SVG>
      <button type="button" onClick={rotate}>
        Rotacionar
      </button>
    </Container>
  )
}

export default ShapeList
