import { cloneElement, type ReactElement } from "react";
import { Button, Modal, Form, Row, Alert } from "react-bootstrap";
import { useShippingCalculator } from "../hooks/useShippingCalculator";
import type { ShippingResult } from "../domain/types";

interface ShippingCalculatorProps {
  trigger?: ReactElement;
  savedCost?: string; // ¿Ya hay un costo calculado previamente?
  onShippingSelected?: (data: ShippingResult) => void; // ¿Qué hago cuando el usuario guarda?
}

const ShippingCalculator = ({ 
  trigger, 
  savedCost, 
  onShippingSelected 
}: ShippingCalculatorProps) => {
  
  // Inyectamos las props al hook (Dependency Injection)
  const {
    showModal,
    postalCode,
    province,
    cost,
    error,
    setPostalCode,
    handleOpenModal,
    handleCloseModal,
    handleCalculateShipping,
    handleSaveDestination,
  } = useShippingCalculator({ 
    currentCost: savedCost, 
    onSave: onShippingSelected 
  });

  const defaultTrigger = (
    <Button variant="secondary" className="w-100 p-0">
      <i className="bi bi-truck me-2" />
      Calcular costo de envío
    </Button>
  );

  const triggerElement = cloneElement(trigger || defaultTrigger, {
    onClick: handleOpenModal,
  } as React.HTMLAttributes<HTMLElement>);

  return (
    <>
      <Row>{triggerElement}</Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center fw-bold">
            Costo de Envío
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => { e.preventDefault(); handleCalculateShipping(); }}>
            <Form.Group className="d-flex align-items-center gap-2">
              <Form.Label className="m-0 text-nowrap">
                Código Postal:
              </Form.Label>
              <Form.Control
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="CP"
                autoFocus
              />
              <Button variant="outline-dark" onClick={handleCalculateShipping}>
                Calcular
              </Button>
            </Form.Group>
          </Form>

          {error && (
            <Alert
              variant="warning"
              className="mt-3 mb-0"
              dismissible
              onClose={() => setPostalCode("")}
            >
              {error}
            </Alert>
          )}

          <div className="mt-2 text-center">
            <a
              href="https://www.correoargentino.com.ar/formularios/cpa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark fw-bold"
            >
              No conozco mi Código Postal
            </a>
          </div>
        </Modal.Body>

        {/* Solo mostramos el footer si hay un cálculo válido temporal (province existe) */}
        {province && !error && (
          <Modal.Footer className="d-flex flex-column align-items-stretch gap-2">
            <div className="w-100 border rounded p-3 text-start border-secondary-subtle">
              <h5 className="fw-bold m-0">OCA</h5>
              <p className="m-0">
                Envío estándar a {province}: <strong>{cost}</strong>
              </p>
              <small className="text-muted d-block mt-1">
                Tiempo de entrega: a partir de 7 días hábiles.
              </small>
            </div>

            <Button variant="dark" onClick={handleSaveDestination}>
              Guardar
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ShippingCalculator;